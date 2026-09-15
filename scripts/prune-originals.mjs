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
 * The filename does appear in the page JS — a static import compiles to an
 * object carrying the original path — but that value is only ever read to
 * derive the WebP URL, never fetched. That is why the JS is not consulted here.
 * Fonts and every other asset type are never touched.
 */
import { readdir, readFile, rm, stat } from 'node:fs/promises';
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
  bytes += (await stat(full)).size;
  await rm(full);
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
  `prune-originals: removed ${removed} source image(s) (${mb(bytes)} MB) and ` +
    `${variantsRemoved} unreferenced WebP variant(s) (${mb(variantBytes)} MB)` +
    (kept.length ? `; kept ${kept.join(', ')}.` : '.')
);
