/**
 * Converts staged cover images into optimized WebP.
 *
 *   1. Drop a full-size image straight into src/assets/
 *   2. npm run assets
 *   3. Paste the printed import line into src/data/galleries.ts
 *
 *   npm run assets -- --dry-run      report only, nothing written or deleted
 *   npm run assets -- --width 2400   override the long-edge cap
 *   npm run assets -- --keep         convert but leave the source in place
 *
 * Only the top level of src/assets/ is treated as staging; images/ and
 * optimized/ are left alone. Covers are bundled with the app rather than read
 * from the bucket because they sit above the fold on the home page, the
 * photography index and every category page — bundling keeps them same-origin,
 * fingerprinted and immutable, and makes a missing cover a build error instead
 * of a silently blank card.
 */
import fs from 'node:fs/promises';
import path from 'node:path';

import sharp from 'sharp';

const STAGING = 'src/assets';
const OUTPUT = 'src/assets/optimized';

/**
 * Long edge, not width: a portrait source capped at 1600 wide would come out
 * 2400 tall and roughly twice the file size, for a slot that crops it to 4:3
 * anyway.
 */
const DEFAULT_MAX_EDGE = 1600;
const QUALITY = 82;

const SOURCE_RX = /\.(jpe?g|png|tiff?|avif|webp)$/i;

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const KEEP_SOURCE = args.includes('--keep');
const widthIndex = args.indexOf('--width');
const MAX_EDGE = widthIndex === -1 ? DEFAULT_MAX_EDGE : Number(args[widthIndex + 1]);

if (!Number.isFinite(MAX_EDGE) || MAX_EDGE < 1) {
  console.error(`--width needs a positive number, got ${JSON.stringify(args[widthIndex + 1])}`);
  process.exit(1);
}

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
const mb = (n) => `${(n / 1_000_000).toFixed(1)} MB`;

/** camelCase identifier for the import line, e.g. adks2026 -> adks2026Cover. */
function importName(base) {
  const camel = base
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase())
    .replace(/[^a-zA-Z0-9]/g, '');
  // An identifier cannot start with a digit, so those get the prefix instead
  // of the suffix rather than reading "cover2026TripCover".
  return /^[0-9]/.test(camel) ? `cover${camel[0].toUpperCase()}${camel.slice(1)}` : `${camel}Cover`;
}

async function main() {
  const entries = await fs.readdir(STAGING, { withFileTypes: true });
  const staged = entries
    .filter((e) => e.isFile() && SOURCE_RX.test(e.name))
    .map((e) => e.name)
    .sort();

  if (!staged.length) {
    console.log(`Nothing staged. Drop cover images into ${STAGING}/ and re-run.`);
    return;
  }

  await fs.mkdir(OUTPUT, { recursive: true });
  const existing = new Set(await fs.readdir(OUTPUT));

  console.log(`${staged.length} staged, long edge ${MAX_EDGE}px, quality ${QUALITY}`);
  if (DRY_RUN) console.log('DRY RUN: nothing will be written or deleted');

  const imports = [];
  let failed = 0;

  for (const name of staged) {
    const source = path.join(STAGING, name);
    const base = name.slice(0, name.lastIndexOf('.'));
    const outName = `${base}.webp`;
    const target = path.join(OUTPUT, outName);

    try {
      const before = await sharp(source, { limitInputPixels: 1_000_000_000 }).metadata();
      const sourceBytes = (await fs.stat(source)).size;
      const replacing = existing.has(outName);

      if (DRY_RUN) {
        console.log(
          `  would write ${outName} from ${name} ` +
            `(${before.width}x${before.height}, ${mb(sourceBytes)})${replacing ? ' [replaces existing]' : ''}`,
        );
        imports.push([base, outName]);
        continue;
      }

      const buffer = await sharp(source, { limitInputPixels: 1_000_000_000 })
        // Bake in EXIF orientation before the resize drops the tag.
        .rotate()
        .resize(MAX_EDGE, MAX_EDGE, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toBuffer();

      await fs.writeFile(target, buffer);
      const after = await sharp(buffer).metadata();
      if (!KEEP_SOURCE) await fs.rm(source);

      console.log(
        `  ${outName.padEnd(24)} ${before.width}x${before.height} ${mb(sourceBytes)}` +
          ` -> ${after.width}x${after.height} ${kb(buffer.length)}` +
          `${replacing ? '  [replaced]' : ''}`,
      );
      imports.push([base, outName]);
    } catch (error) {
      failed += 1;
      console.error(`  ! ${name}: ${error.message}`);
    }
  }

  if (imports.length) {
    console.log('\nImport lines for src/data/galleries.ts:\n');
    for (const [base, outName] of imports) {
      console.log(`  import ${importName(base)} from '@/assets/optimized/${outName}';`);
    }
    console.log(
      '\nESLint sorts imports, so `npx eslint src/data/galleries.ts --fix` after pasting.',
    );
  }
  if (failed) process.exitCode = 1;
}

try {
  await main();
} catch (error) {
  console.error(`\noptimize-assets failed: ${error.message}`);
  process.exit(1);
}
