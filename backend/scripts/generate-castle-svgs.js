import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '../../frontend/public/icons/castles');
const outJs = path.join(__dirname, '../../frontend/src/data/castleIcons.js');

const GRAD = `
  <defs>
    <linearGradient id="castleGrad" x1="12%" y1="88%" x2="88%" y2="12%">
      <stop offset="0%" stop-color="#0c1526"/>
      <stop offset="55%" stop-color="#152238"/>
      <stop offset="100%" stop-color="#c026d3"/>
    </linearGradient>
  </defs>`;

function svg(body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" aria-hidden="true">
${GRAD}
${body}
</svg>`;
}

const G = 'stroke="url(#castleGrad)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
const F = 'fill="url(#castleGrad)" fill-opacity="0.12" stroke="url(#castleGrad)" stroke-width="1.8" stroke-linejoin="round"';

/** Interlude castle fortress silhouettes — transparent SVG. */
const CASTLE_SVGS = {
  Gludio: `
    <path ${F} d="M18 72 V48 L26 40 H36 L42 48 V72 Z"/>
    <path ${F} d="M58 72 V48 L64 40 H74 L82 48 V72 Z"/>
    <path ${F} d="M34 72 V52 H66 V72 Z"/>
    <path ${F} d="M42 52 V38 H58 V52 Z"/>
    <path ${G} d="M22 40 V34 H30 V40 M70 40 V34 H78 V40"/>
    <path ${G} d="M44 38 H56 M46 60 H54 V72"/>
    <path ${G} d="M15 72 H85"/>
  `,

  Dion: `
    <path ${F} d="M22 72 V50 L34 38 H66 L78 50 V72 Z"/>
    <path ${F} d="M36 72 V54 Q50 44 64 54 V72 Z"/>
    <path ${F} d="M42 38 V30 H58 V38 Z"/>
    <path ${G} d="M30 38 H70 M42 30 Q50 24 58 30"/>
    <path ${G} d="M44 60 H56 V72"/>
    <path ${G} d="M16 72 H84"/>
    <path ${G} d="M18 76 Q30 73 42 76 Q54 79 66 76 Q78 73 88 76" stroke-opacity="0.45"/>
  `,

  Giran: `
    <path ${F} d="M14 72 V54 L24 44 H34 V72 Z"/>
    <path ${F} d="M66 72 V44 H76 L86 54 V72 Z"/>
    <path ${F} d="M32 72 V40 H68 V72 Z"/>
    <path ${F} d="M44 40 V24 H56 V40 Z"/>
    <path ${F} d="M48 24 V16 H52 V24 Z"/>
    <path ${G} d="M22 44 H78 M44 24 H56 M50 16 V10"/>
    <path ${G} d="M42 58 H58 V72"/>
    <path ${G} d="M12 72 H88"/>
  `,

  Oren: `
    <path ${F} d="M36 72 V34 L42 24 H58 L64 34 V72 Z"/>
    <path ${F} d="M18 72 V56 L30 46 H38 V72 Z"/>
    <path ${F} d="M62 72 V46 H70 L82 56 V72 Z"/>
    <path ${G} d="M42 24 V16 H58 V24"/>
    <path ${G} d="M26 46 L38 34 M74 46 L62 34"/>
    <path ${G} d="M46 58 H54 V72"/>
    <path ${G} d="M14 72 H86"/>
    <path ${G} d="M10 68 L22 58 M90 68 L78 58" stroke-opacity="0.45"/>
  `,

  Aden: `
    <path ${F} d="M8 72 V52 L18 42 H30 V72 Z"/>
    <path ${F} d="M70 72 V42 H82 L92 52 V72 Z"/>
    <path ${F} d="M26 72 V38 H74 V72 Z"/>
    <path ${F} d="M38 38 V24 H48 V38 Z"/>
    <path ${F} d="M52 38 V24 H62 V38 Z"/>
    <path ${F} d="M46 24 V10 H54 V24 Z"/>
    <path ${G} d="M50 10 V5 M54 8 H62"/>
    <path ${G} d="M34 52 H66 V72 M44 56 H56 V72"/>
    <path ${G} d="M6 72 H94"/>
  `,

  Innadril: `
    <path ${F} d="M24 72 V52 Q50 34 76 52 V72 Z"/>
    <path ${F} d="M36 72 V50 Q50 38 64 50 V72 Z"/>
    <path ${F} d="M42 50 V32 Q50 24 58 32 V50 Z"/>
    <path ${G} d="M30 58 Q50 44 70 58"/>
    <path ${G} d="M40 60 H60 V72 M46 32 Q50 28 54 32"/>
    <path ${G} d="M14 72 H86"/>
    <path ${G} d="M18 77 Q34 73 50 77 Q66 81 82 77" stroke-opacity="0.45"/>
  `,

  Goddard: `
    <path ${F} d="M16 72 V54 L28 42 H38 V72 Z"/>
    <path ${F} d="M62 72 V42 H72 L84 54 V72 Z"/>
    <path ${F} d="M30 72 V46 H70 V72 Z"/>
    <path ${F} d="M38 46 V34 H62 V46 Z"/>
    <path ${G} d="M40 34 L46 24 L50 34 M50 34 L56 24 L62 34"/>
    <path ${G} d="M44 58 H56 V72"/>
    <path ${G} d="M12 72 H88"/>
    <path ${G} d="M46 24 L50 12 L54 24" stroke-opacity="0.55"/>
  `,

  Rune: `
    <path ${F} d="M22 72 V44 L32 30 H42 V72 Z"/>
    <path ${F} d="M58 72 V30 H68 L78 44 V72 Z"/>
    <path ${F} d="M40 72 V50 H60 V72 Z"/>
    <path ${F} d="M46 50 V34 H54 V50 Z"/>
    <path ${G} d="M30 30 L34 20 M70 20 L74 30"/>
    <path ${G} d="M46 34 Q50 28 54 34"/>
    <path ${G} d="M46 56 H54 V72"/>
    <path ${G} d="M16 72 H84"/>
    <path ${G} d="M50 24 V14 M47 17 H53" stroke-opacity="0.55"/>
  `,

  Schuttgart: `
    <path ${F} d="M20 72 V50 L32 38 H68 L80 50 V72 Z"/>
    <path ${F} d="M36 72 V54 H64 V72 Z"/>
    <path ${F} d="M42 38 V28 H58 V38 Z"/>
    <path ${G} d="M32 38 L38 30 M68 38 L62 30"/>
    <path ${G} d="M46 28 L50 18 L54 28"/>
    <path ${G} d="M44 58 H56 V72"/>
    <path ${G} d="M14 72 H86"/>
    <path ${G} d="M24 46 H34 V54 M66 54 V46 H76" stroke-opacity="0.5"/>
    <path ${G} d="M18 78 L26 72 M74 72 L82 78" stroke-opacity="0.4"/>
  `,
};

fs.mkdirSync(outDir, { recursive: true });

const mapping = {};
for (const [name, body] of Object.entries(CASTLE_SVGS)) {
  const filename = `${name.toLowerCase()}.svg`;
  fs.writeFileSync(path.join(outDir, filename), svg(body.trim()));
  mapping[name] = `/icons/castles/${filename}`;
}

const js = `/** Transparent fortress SVG icons per Interlude castle. */
export const CASTLE_ICONS = ${JSON.stringify(mapping, null, 2)};

export function getCastleIcon(castleName) {
  return CASTLE_ICONS[castleName] ?? null;
}
`;

fs.writeFileSync(outJs, js);
console.log(`Generated ${Object.keys(mapping).length} castle SVGs -> ${outDir}`);
