/**
 * Removes the unreferenced source photographs from the export.
 *
 * A static import (`import hero from '@images/hero.jpg'`) makes webpack emit the
 * original JPG into `out/_next/static/media/`. The pages never point at it —
 * next-image-export-optimizer rewrites every `<img>` to the WebP variants under
 * `out/nextImageExportOptimizer/` — so the originals ship as dead weight, and
 * they are the largest files in the export.
 *
 * Runs as part of `postbuild`. A file is deleted only when BOTH hold:
 *
 *   1. the optimizer produced WebP variants for it — `out/nextImageExportOptimizer/`
 *      contains `<stem>-opt-<width>.WEBP`, which is proof the pages were
 *      rewritten to those; and
 *   2. its filename appears in no exported HTML, so no page requests the
 *      original directly (an `unoptimized` image, or a plain <img>).
 *
 * The originals are SHRUNK IN PLACE to a 16px stand-in rather than deleted,
 * and that distinction is load-bearing. next-image-export-optimizer's
 * ExportedImage treats `naturalWidth === 0` on the load event as a broken
 * image and switches its loader to the ORIGINAL path (`fallbackLoader`). That
 * fires spuriously for every image sitting in a `display:none` container —
 * measured on the built page, the hero's hidden ground and portrait both did
 * it. Deleting the originals turned that into a 404 on every page view;
 * restoring them in full would be worse still, because the fallback would then
 * pull a multi-megabyte JPEG. A 16px file in the right format at the right
 * path costs about a kilobyte and ends both failure modes.
 *
 * Fonts and every other asset type are never touched.
 */
import { readdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import sharp from 'sharp';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const out = path.join(root, 'out');
const mediaDir = path.join(out, '_next', 'static', 'media');
const optimizedDir = path.join(out, 'nextImageExportOptimizer');

/** Only source photographs are candidates. Fonts and icons are left alone. */
const RASTER = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif']);

if (!existsSync(mediaDir)) {
  console.log('prune-originals: nothing to do (no out/_next/static/media).');
  process.exit(0);
}

const candidates = (await readdir(mediaDir)).filter((f) =>
  RASTER.has(path.extname(f).toLowerCase())
);
if (candidates.length === 0) {
  console.log('prune-originals: no source images in the export.');
  process.exit(0);
}

/** Stems that the optimizer has actually produced WebP variants for. */
const optimized = new Set();
if (existsSync(optimizedDir)) {
  for (const file of await readdir(optimizedDir)) {
    const match = file.match(/^(.*)-opt-\d+\.WEBP$/i);
    if (match) optimized.add(match[1]);
  }
}

const walkHtml = async (dir) => {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await walkHtml(full)));
    else if (path.extname(entry.name).toLowerCase() === '.html') found.push(full);
  }
  return found;
};

const html = (
  await Promise.all((await walkHtml(out)).map((f) => readFile(f, 'utf8')))
).join('\n');

/** Wide enough to stay a valid image, small enough to be free. */
const STANDIN_WIDTH = 16;

let removed = 0;
let bytes = 0;
const kept = [];
for (const name of candidates) {
  const stem = name.slice(0, -path.extname(name).length);
  if (!optimized.has(stem) || html.includes(name)) {
    kept.push(name);
    continue;
  }
  const full = path.join(mediaDir, name);
  const before = (await stat(full)).size;
  try {
    // Read first: sharp must not be reading the file it is about to overwrite.
    const standin = await sharp(await readFile(full))
      .resize({ width: STANDIN_WIDTH })
      .toBuffer();
    await writeFile(full, standin);
    bytes += before - standin.length;
  } catch {
    // Format sharp will not re-encode: the old behaviour is still better than
    // shipping the full-size original.
    await rm(full);
    bytes += before;
  }
  removed++;
}

/**
 * Second pass: WebP variants the pages never ask for.
 *
 * Two ways these appear. The optimizer's folder scan of public/ encodes any
 * raster it finds there even when nothing imports it (the Asianajajaliitto
 * mark is served as a plain <img>, so its whole variant set is dead). And for
 * an image that IS used, next/image writes a srcset listing only the widths it
 * computed — the other eight or so widths are never requested by any browser.
 *
 * Only out/ is pruned. public/nextImageExportOptimizer/ keeps the full set and
 * is re-copied on every build, so nothing here has to be re-encoded.
 */
let variantsRemoved = 0;
let variantBytes = 0;
if (existsSync(optimizedDir)) {
  for (const file of await readdir(optimizedDir)) {
    if (!/-opt-\d+\.WEBP$/i.test(file) || html.includes(file)) continue;
    const full = path.join(optimizedDir, file);
    variantBytes += (await stat(full)).size;
    await rm(full);
    variantsRemoved++;
  }
}

const mb = (n) => (n / 1024 / 1024).toFixed(2);
console.log(
  `prune-originals: shrank ${removed} source image(s) (${mb(bytes)} MB saved) and ` +
    `${variantsRemoved} unreferenced WebP variant(s) (${mb(variantBytes)} MB)` +
    (kept.length ? `; kept ${kept.join(', ')}.` : '.')
);
