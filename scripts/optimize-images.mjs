/**
 * Batch-optimize the portfolio images.
 *
 * Source PNG/JPG files live in `image-sources/portfolio` (kept out of the
 * served `src/assets` folder so the originals are never shipped). For each one
 * a resized, compressed `.webp` is written into `src/assets/images/portfolio`,
 * which the app references. Run with: npm run optimize:images
 */
import { readdir, stat } from 'node:fs/promises';
import { basename, dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const here = dirname(fileURLToPath(import.meta.url));
const sourceDir = join(here, '..', 'image-sources', 'portfolio');
const outputDir = join(here, '..', 'src', 'assets', 'images', 'portfolio');

/** ~2x the widest the card ever renders (3-up grid inside an 84rem container). */
const MAX_WIDTH = 900;
const QUALITY = 80;

const files = (await readdir(sourceDir)).filter((f) => /\.(png|jpe?g)$/i.test(f));

let before = 0;
let after = 0;

for (const file of files) {
  const input = join(sourceDir, file);
  const outputName = `${basename(file, extname(file))}.webp`;
  const output = join(outputDir, outputName);

  const { size } = await sharp(input)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(output);

  const original = await stat(input);
  before += original.size;
  after += size;

  console.log(
    `${file.padEnd(16)} ${(original.size / 1024).toFixed(0).padStart(5)} KB  ->  ` +
      `${outputName.padEnd(16)} ${(size / 1024).toFixed(0).padStart(4)} KB`
  );
}

console.log(
  `\nTotal: ${(before / 1024 / 1024).toFixed(1)} MB  ->  ${(after / 1024 / 1024).toFixed(2)} MB`
);
