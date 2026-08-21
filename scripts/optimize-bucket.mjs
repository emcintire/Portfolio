/**
 * Downsizes photographs in the public Backblaze bucket to web dimensions, in place.
 *
 *   node scripts/optimize-bucket.mjs --dry-run   # report only, changes nothing
 *   node scripts/optimize-bucket.mjs             # do it
 */
import { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';

import nextEnv from '@next/env';
import sharp from 'sharp';

nextEnv.loadEnvConfig(process.cwd());

const DRY_RUN = process.argv.includes('--dry-run');

/** Long edge in pixels. Comfortably above the widest the lightbox displays. */
const MAX_EDGE = 2560;
const QUALITY = 82;

/**
 * A file already within MAX_EDGE and under this size is left byte-for-byte
 * alone and merely tagged. Re-encoding an image that is already web-sized only
 * throws away quality — one 1620x945 file in this bucket drops from 120 KB to
 * 40 KB, which is compression it did not need.
 */
const ALREADY_WEB_BYTES = 1_500_000;

/** Bump to force a re-run over everything, e.g. after changing MAX_EDGE. */
const MARKER = 'v1';
const MARKER_KEY = 'webopt';

/** Whole-file decodes are memory-hungry; a 135 MB PNG needs ~1 GB decoded. */
const CONCURRENCY = 3;

const IMAGE_RX = /\.(jpe?g|png|webp|avif)$/i;
const KEEP_EXTENSION_RX = /\.jpe?g$/i;

const BUCKET = process.env.B2_BUCKET;
const KEY_ID = process.env.B2_KEY_ID;
const APP_KEY = process.env.B2_APP_KEY;

const mb = (n) => `${(n / 1_000_000).toFixed(1)} MB`;

async function api(auth, endpoint, params) {
  const url = new URL(`/b2api/v3/${endpoint}`, auth.apiUrl);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const res = await fetch(url, { headers: { Authorization: auth.token } });
  if (!res.ok) throw new Error(`${endpoint} failed: ${res.status} ${await res.text()}`);
  return res.json();
}

async function authorize() {
  if (!KEY_ID || !APP_KEY || !BUCKET) {
    throw new Error('Set B2_BUCKET plus B2_WRITE_KEY_ID / B2_WRITE_APP_KEY (see file header).');
  }

  const basic = Buffer.from(`${KEY_ID}:${APP_KEY}`).toString('base64');
  const res = await fetch('https://api.backblazeb2.com/b2api/v3/b2_authorize_account', {
    headers: { Authorization: `Basic ${basic}` },
  });
  if (!res.ok) throw new Error(`authorize failed: ${res.status} ${await res.text()}`);

  const body = await res.json();
  const storage = body.apiInfo.storageApi;
  const auth = {
    apiUrl: storage.apiUrl,
    bucketId: storage.bucketId,
    capabilities: storage.capabilities,
    downloadUrl: storage.downloadUrl,
    token: body.authorizationToken,
  };

  if (!auth.bucketId) {
    const { buckets } = await api(auth, 'b2_list_buckets', {
      accountId: body.accountId,
      bucketName: BUCKET,
    });
    auth.bucketId = buckets?.[0]?.bucketId;
  }
  if (!auth.bucketId) throw new Error(`bucket "${BUCKET}" not visible to these credentials`);

  const missing = ['writeFiles', 'deleteFiles'].filter((c) => !auth.capabilities.includes(c));
  if (missing.length && !DRY_RUN) {
    throw new Error(
      `This key lacks ${missing.join(' and ')}. Create an application key with write access ` +
        `to "${BUCKET}" and set B2_WRITE_KEY_ID / B2_WRITE_APP_KEY. ` +
        `Current capabilities: ${auth.capabilities.join(', ')}`,
    );
  }

  return auth;
}

async function listAll(auth) {
  const files = [];
  let startFileName = null;
  do {
    const params = { bucketId: auth.bucketId, maxFileCount: '1000' };
    if (startFileName) params.startFileName = startFileName;
    const body = await api(auth, 'b2_list_file_names', params);
    for (const f of body.files) {
      if (f.action === 'upload' && IMAGE_RX.test(f.fileName)) files.push(f);
    }
    startFileName = body.nextFileName;
  } while (startFileName);
  return files;
}

async function download(auth, fileName) {
  const url = `${auth.downloadUrl}/file/${BUCKET}/${fileName
    .split('/')
    .map(encodeURIComponent)
    .join('/')}`;
  const res = await fetch(url, { headers: { Authorization: auth.token } });
  if (!res.ok) throw new Error(`download failed: ${res.status} ${fileName}`);
  return Buffer.from(await res.arrayBuffer());
}

async function upload(auth, fileName, body, contentType) {
  // Upload URLs are single-use-at-a-time, so fetch one per upload.
  const slot = await api(auth, 'b2_get_upload_url', { bucketId: auth.bucketId });
  const res = await fetch(slot.uploadUrl, {
    body,
    headers: {
      Authorization: slot.authorizationToken,
      'Content-Length': String(body.byteLength),
      'Content-Type': contentType,
      'X-Bz-Content-Sha1': createHash('sha1').update(body).digest('hex'),
      'X-Bz-File-Name': encodeURIComponent(fileName),
      [`X-Bz-Info-${MARKER_KEY}`]: MARKER,
    },
    method: 'POST',
  });
  if (!res.ok) throw new Error(`upload failed: ${res.status} ${await res.text()}`);
  return res.json();
}

const deleteVersion = (auth, fileName, fileId) =>
  fetch(new URL('/b2api/v3/b2_delete_file_version', auth.apiUrl), {
    body: JSON.stringify({ fileId, fileName }),
    headers: { Authorization: auth.token, 'Content-Type': 'application/json' },
    method: 'POST',
  });

async function pooled(items, worker) {
  const queue = [...items];
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, queue.length) }, async () => {
      while (queue.length) await worker(queue.shift());
    }),
  );
}

async function main() {
  const auth = await authorize();
  const all = await listAll(auth);
  const pending = all.filter((f) => f.fileInfo?.[MARKER_KEY] !== MARKER);

  const totalBefore = all.reduce((n, f) => n + f.contentLength, 0);
  console.log(
    `${all.length} images, ${mb(totalBefore)} total — ` +
      `${pending.length} to process, ${all.length - pending.length} already optimized`,
  );
  if (DRY_RUN) console.log('DRY RUN: nothing will be written\n');
  if (!pending.length) return;

  let done = 0;
  let saved = 0;
  let failed = 0;
  let skipped = 0;

  // Converting foo.png to foo.jpg overwrites an existing foo.jpg, destroying a
  // different photograph. Refuse rather than clobber.
  const existing = new Set(all.map((f) => f.fileName));

  await pooled(pending, async (file) => {
    const label = file.fileName;
    try {
      // Convert everything that is not already JPEG; photographs stored as PNG
      // are the largest files in the bucket by a wide margin.
      const targetName = KEEP_EXTENSION_RX.test(label)
        ? label
        : `${label.slice(0, label.lastIndexOf('.'))}.jpg`;

      if (targetName !== label && existing.has(targetName)) {
        skipped += 1;
        console.warn(
          `  ! ${label} would overwrite existing ${targetName} — skipped. ` +
            `Rename one of them, then re-run.`,
        );
        return;
      }

      if (DRY_RUN) {
        console.log(
          `  would process ${label} (${mb(file.contentLength)})` +
            (targetName === label ? '' : ` -> ${targetName}`),
        );
        done += 1;
        return;
      }

      const original = await download(auth, label);
      const meta = await sharp(original, { limitInputPixels: 1_000_000_000 }).metadata();
      const alreadyWeb =
        targetName === label &&
        original.byteLength <= ALREADY_WEB_BYTES &&
        Math.max(meta.width ?? 0, meta.height ?? 0) <= MAX_EDGE;

      const optimized = alreadyWeb
        ? original
        : await sharp(original, { limitInputPixels: 1_000_000_000 })
            // Bake in EXIF orientation: the resize drops the tag, and without
            // this portrait shots come out rotated.
            .rotate()
            .resize(MAX_EDGE, MAX_EDGE, { fit: 'inside', withoutEnlargement: true })
            .jpeg({ mozjpeg: true, progressive: true, quality: QUALITY })
            .toBuffer();

      // Never make a file bigger either.
      const keepOriginal =
        alreadyWeb || (optimized.byteLength >= original.byteLength && targetName === label);
      const body = keepOriginal ? original : optimized;
      const contentType = keepOriginal ? file.contentType : 'image/jpeg';

      await upload(auth, targetName, body, contentType);
      if (targetName !== label) await deleteVersion(auth, label, file.fileId);

      saved += file.contentLength - body.byteLength;
      done += 1;
      console.log(
        `  ${String(done).padStart(3)}/${pending.length} ${label} ` +
          `${mb(file.contentLength)} -> ${mb(body.byteLength)}` +
          `${keepOriginal ? ' (already web-sized, kept)' : ''}`,
      );
    } catch (error) {
      failed += 1;
      console.error(`  ! ${label}: ${error.message}`);
    }
  });

  console.log(`\nprocessed ${done}, skipped ${skipped}, failed ${failed}, reclaimed ${mb(saved)}`);
  if (failed) {
    console.log('Failures stay untagged, so re-running picks up exactly those files again.');
  }
  if (!DRY_RUN) {
    console.log(
      'Note: B2 keeps prior versions unless the bucket lifecycle is set to ' +
        '"keep only the last version" — otherwise the originals still occupy storage.',
    );
  }
}

try {
  await main();
} catch (error) {
  console.error(`\noptimize-bucket failed: ${error.message}`);
  process.exit(1);
}
