import 'server-only';

import { cache } from 'react';

import type { Photograph } from '@/types';

const KEY_ID = process.env.B2_KEY_ID;
const APP_KEY = process.env.B2_APP_KEY;
const BUCKET = process.env.B2_BUCKET;

const PHOTO_REVALIDATE_SECONDS = 300;

const PREFIX = '';
const IMAGE_RX = /\.(jpe?g|png|webp|avif)$/i;

/** Categories whose gallery renders at the category URL, so the bucket is flat. */
const FLAT_CATEGORIES = new Set(['animals', 'favorites']);

type Auth = { apiUrl: string; bucketId: string; downloadUrl: string; token: string };

type ListedFile = { action: string; fileInfo?: Record<string, string>; fileName: string };

/** A listed photograph: everything but the alt text, which the page writes. */
export type BucketPhotograph = Omit<Photograph, 'alt'>;

/** A positive whole number from B2 file info, which stores every value as a string. */
const pixels = (value?: string) => {
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? n : undefined;
};

const missingConfig = () => !KEY_ID || !APP_KEY || !BUCKET;

/**
 * Attempts per request, including the first.
 *
 * A build fires dozens of listings at once, and a dropped connection mid-burst
 * ("fetch failed") outlasted the old three tries inside 0.6s and failed a
 * deploy. Five tries backing off from 0.5s span about eight seconds — long
 * enough for a blip to clear, and the wait never reaches a visitor: at runtime
 * pages regenerate in the background.
 */
const MAX_ATTEMPTS = 5;
const BASE_DELAY_MS = 500;

const wait = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

/** Exponential, with jitter so a burst of failed requests doesn't retry in lockstep. */
const backoff = (attempt: number) =>
  BASE_DELAY_MS * 2 ** (attempt - 1) * (0.75 + Math.random() / 2);

/** fetch() reports every network failure as just "fetch failed"; the real error is its cause. */
const describe = (error: unknown) => {
  if (!(error instanceof Error)) return String(error);
  const cause = error.cause;
  if (!(cause instanceof Error)) return error.message;
  const code = (cause as Error & { code?: string }).code;
  return `${error.message} (${code ? `${code}: ` : ''}${cause.message})`;
};

async function fetchJson<T>(url: string | URL, init: RequestInit, label: string): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      const res = await fetch(url, init);

      if (!res.ok) {
        const detail = `${label} failed: ${res.status} ${await res.text()}`;
        const retryable = res.status >= 500 || res.status === 429;
        if (!retryable) throw new Error(detail);
        lastError = new Error(detail);
      } else {
        const text = await res.text();
        if (text.trim()) return JSON.parse(text) as T;
        lastError = new Error(`${label} returned an empty body`);
      }
    } catch (error) {
      // A thrown non-retryable HTTP error must not be swallowed into a retry.
      if (error instanceof Error && error.message.startsWith(`${label} failed:`)) throw error;
      lastError = error;
    }

    if (attempt < MAX_ATTEMPTS) await wait(backoff(attempt));
  }

  throw new Error(`${label} failed after ${MAX_ATTEMPTS} attempts: ${describe(lastError)}`);
}

/**
 * The current UTC hour, e.g. "2026-09-30T03", sent with the authorization request.
 * B2 ignores it; Next does not. Keyed by the hour, no cached token is ever much more than an hour old.
 */
const tokenHour = () => new Date().toISOString().slice(0, 13);

const authorize = cache(async (): Promise<Auth> => {
  const basic = Buffer.from(`${KEY_ID}:${APP_KEY}`).toString('base64');
  const body = await fetchJson<{
    accountId: string;
    apiInfo: { storageApi: { apiUrl: string; bucketId?: string; downloadUrl: string } };
    authorizationToken: string;
  }>(
    'https://api.backblazeb2.com/b2api/v3/b2_authorize_account',
    {
      headers: { Authorization: `Basic ${basic}`, 'X-Token-Hour': tokenHour() },
      next: { revalidate: PHOTO_REVALIDATE_SECONDS },
    },
    'b2_authorize_account',
  );
  const api = body.apiInfo.storageApi;

  let bucketId: string | undefined = api.bucketId ?? undefined;
  if (!bucketId) {
    // An account-wide key does not carry a bucket id, so look it up by name.
    const url = new URL('/b2api/v3/b2_list_buckets', api.apiUrl);
    url.searchParams.set('accountId', body.accountId);
    url.searchParams.set('bucketName', BUCKET!);
    const lookup = await fetchJson<{ buckets?: Array<{ bucketId: string }> }>(
      url,
      {
        headers: { Authorization: body.authorizationToken },
        next: { revalidate: PHOTO_REVALIDATE_SECONDS },
      },
      'b2_list_buckets',
    );
    bucketId = lookup.buckets?.[0]?.bucketId;
  }
  if (!bucketId) throw new Error(`bucket "${BUCKET}" not visible to these credentials`);

  return {
    apiUrl: api.apiUrl,
    bucketId,
    downloadUrl: api.downloadUrl,
    token: body.authorizationToken,
  };
});

/** Bucket folder for an album. Flat categories keep everything at one level. */
const folderFor = (categoryId: string, albumId: string) =>
  FLAT_CATEGORIES.has(categoryId)
    ? `${PREFIX}${categoryId}/`
    : `${PREFIX}${categoryId}/${albumId}/`;

async function listFolder(auth: Auth, folder: string): Promise<ListedFile[]> {
  const files: ListedFile[] = [];
  let startFileName: string | null = null;

  do {
    const url = new URL('/b2api/v3/b2_list_file_names', auth.apiUrl);
    url.searchParams.set('bucketId', auth.bucketId);
    url.searchParams.set('prefix', folder);
    url.searchParams.set('delimiter', '/');
    url.searchParams.set('maxFileCount', '1000');
    if (startFileName) url.searchParams.set('startFileName', startFileName);

    const body = await fetchJson<{ files: ListedFile[]; nextFileName: string | null }>(
      url,
      {
        headers: { Authorization: auth.token },
        next: { revalidate: PHOTO_REVALIDATE_SECONDS },
      },
      'b2_list_file_names',
    );
    for (const file of body.files) {
      if (file.action === 'upload' && IMAGE_RX.test(file.fileName)) files.push(file);
    }
    startFileName = body.nextFileName;
  } while (startFileName);

  // Natural sort, so photo2 precedes photo10 whatever the naming scheme.
  return files.sort((a, b) =>
    a.fileName.localeCompare(b.fileName, 'en', { numeric: true, sensitivity: 'base' }),
  );
}

export const listAlbumPhotographs = cache(
  async (categoryId: string, albumId: string): Promise<BucketPhotograph[]> => {
    if (missingConfig()) {
      console.warn('B2_KEY_ID / B2_APP_KEY / B2_BUCKET are unset — galleries will render empty.');
      return [];
    }

    const auth = await authorize();
    const folder = folderFor(categoryId, albumId);
    const photographs = (await listFolder(auth, folder)).map(({ fileInfo, fileName }) => {
      const width = pixels(fileInfo?.width);
      const height = pixels(fileInfo?.height);
      return {
        src: `${auth.downloadUrl}/file/${BUCKET}/${fileName.split('/').map(encodeURIComponent).join('/')}`,
        ...(width && height ? { height, width } : {}),
      };
    });

    // Sizes are what let the grid hold each photograph's place before it loads.
    const unsized = photographs.filter((photograph) => !photograph.width).length;
    if (unsized) {
      const [noun, verb, pronoun] =
        unsized === 1 ? ['photograph', 'has', 'it loads'] : ['photographs', 'have', 'they load'];
      console.warn(
        `${unsized} ${noun} in ${folder} ${verb} no recorded size, so the grid will shift ` +
          `as ${pronoun}. Run \`npm run photos:optimize\`.`,
      );
    }

    return photographs;
  },
);

/** Photographs for several albums at once, sharing a single authorization. */
export async function listAlbumCounts(
  categoryId: string,
  albumIds: string[],
): Promise<Record<string, number>> {
  const lists = await Promise.all(
    albumIds.map(
      async (albumId) =>
        [albumId, (await listAlbumPhotographs(categoryId, albumId)).length] as const,
    ),
  );
  return Object.fromEntries(lists);
}
