/**
 * Hero class portraits are original pencil/ink fan-art PNGs in:
 *   frontend/public/icons/hero-classes/class-{id}.png
 *
 * Inspired by Lineage II official race concept art (NCSoft / Juno Jeong style)
 * — not copied from third-party galleries.
 *
 * To replace a portrait: add class-{id}.png to that folder and refresh the site.
 * Mapping lives in frontend/src/data/heroClassArt.js
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '../../frontend/public/icons/hero-classes');
const ids = [];
for (let id = 88; id <= 118; id += 1) ids.push(id);

const missing = ids.filter((id) => !fs.existsSync(path.join(outDir, `class-${id}.png`)));
if (missing.length) {
  console.warn('Missing portraits:', missing.join(', '));
} else {
  console.log(`All ${ids.length} class portraits present in ${outDir}`);
}
