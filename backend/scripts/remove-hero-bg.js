import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = process.argv[2] || 'hero-animated.png';
const input = path.join(__dirname, '../../frontend/public', file);

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

// Page lavender: #f7f5fc — also strip white / light grey boxes
const BG = { r: 247, g: 245, b: 252 };

function colorDistance(r, g, b) {
  return Math.sqrt(
    (r - BG.r) ** 2 + (g - BG.g) ** 2 + (b - BG.b) ** 2
  );
}

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const spread = Math.max(r, g, b) - Math.min(r, g, b);
  const brightness = (r + g + b) / 3;
  const dist = colorDistance(r, g, b);

  if (dist < 18 || (brightness > 232 && spread < 35)) {
    data[i + 3] = 0;
  } else if (dist < 42 || (brightness > 210 && spread < 50)) {
    const edge = dist < 42 ? (42 - dist) / 24 : (255 - brightness) / 45;
    const fade = Math.floor(Math.min(1, edge) * 255);
    data[i + 3] = Math.min(data[i + 3], Math.max(0, fade));
  }
}

// Soft-feather hard crop edges in the PNG itself (not CSS overlays)
const featherBottom = Math.floor(info.height * 0.12);
const featherRight = Math.floor(info.width * 0.06);

for (let y = 0; y < info.height; y++) {
  for (let x = 0; x < info.width; x++) {
    const i = (y * info.width + x) * 4;
    if (data[i + 3] === 0) continue;

    let mult = 1;

    if (y >= info.height - featherBottom) {
      const t = (y - (info.height - featherBottom)) / featherBottom;
      mult *= 1 - t * t;
    }

    if (x >= info.width - featherRight) {
      const t = (x - (info.width - featherRight)) / featherRight;
      mult *= 1 - t * t;
    }

    if (mult < 1) {
      data[i + 3] = Math.floor(data[i + 3] * mult);
    }
  }
}

await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .png()
  .toFile(input);

console.log(`Transparent PNG saved: ${input}`);
