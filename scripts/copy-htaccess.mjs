/**
 * Copies the repo-root .htaccess into the export.
 *
 * The master copy lives at the repo root rather than in public/ so it is
 * edited in one obvious place and is not filed alongside the images. Next only
 * copies public/ into out/, so the root file needs this step to ship.
 *
 * Runs first in `postbuild`, deliberately: if the Apache config is missing,
 * that is worth failing the build over. A deploy without it loses the HTTPS
 * redirect, the canonical host and — on the test host — the noindex header
 * that keeps a placeholder-filled copy of the site out of Google. All three
 * fail silently in production, which is exactly why they fail loudly here.
 */
import { copyFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, '.htaccess');
const outDir = join(root, 'out');

if (!existsSync(src)) {
  console.error(
    'copy-htaccess: .htaccess puuttuu repon juuresta. Ilman sitä exportista jäisi pois HTTPS-ohjaus, kanoninen isäntä ja testiympäristön noindex.'
  );
  process.exit(1);
}
if (!existsSync(outDir)) {
  console.error(
    'copy-htaccess: out/ ei ole olemassa — aja tämä vasta `next build`in jälkeen.'
  );
  process.exit(1);
}

copyFileSync(src, join(outDir, '.htaccess'));
console.log('copy-htaccess: .htaccess -> out/.htaccess');
