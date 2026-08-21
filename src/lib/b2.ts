import 'server-only';

import { cache } from 'react';

const KEY_ID = process.env.B2_KEY_ID;
const APP_KEY = process.env.B2_APP_KEY;
const BUCKET = process.env.B2_BUCKET;

export const PHOTO_REVALIDATE_SECONDS = 3600;

const PREFIX = '';
const IMAGE_RX = /\.(jpe?g|png|webp|avif)$/i;

/** Categories whose gallery renders at the category URL, so the bucket is flat. */
const FLAT_CATEGORIES = new Set(['animals', 'misc']);

type Auth = { apiUrl: string; bucketId: string; downloadUrl: string; token: string };

type ListedFile = { action: string; fileName: string };

const missingConfig = () => !KEY_ID || !APP_KEY || !BUCKET;

/** Attempts per request, including the first. */
const MAX_ATTEMPTS = 3;

const wait = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

/**
 * A fetch that survives a flaky moment.
 *
 * Retries connection failures, 5xx and 429, and — the one that actually bit —
 * a 200 whose body is empty or truncated, where `res.json()` throws
 * "Unexpected end of JSON input" and would otherwise 500 the whole page.
 *
 * A 4xx other than 429 is not retried: that is a wrong key or a missing
 * bucket, and repeating it just delays a failure that needs a human.
 */
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

    if (attempt < MAX_ATTEMPTS) await wait(200 * 2 ** (attempt - 1));
  }

  throw new Error(
    `${label} failed after ${MAX_ATTEMPTS} attempts: ${
      lastError instanceof Error ? lastError.message : String(lastError)
    }`,
  );
}

const authorize = cache(async (): Promise<Auth> => {
  const basic = Buffer.from(`${KEY_ID}:${APP_KEY}`).toString('base64');
  const body = await fetchJson<{
    accountId: string;
    apiInfo: { storageApi: { apiUrl: string; bucketId?: string; downloadUrl: string } };
    authorizationToken: string;
  }>(
    'https://api.backblazeb2.com/b2api/v3/b2_authorize_account',
    {
      headers: { Authorization: `Basic ${basic}` },
      // B2 tokens last 24h, so reusing one for the revalidation window is safe.
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

async function listFolder(auth: Auth, folder: string): Promise<string[]> {
  const names: string[] = [];
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
      if (file.action === 'upload' && IMAGE_RX.test(file.fileName)) names.push(file.fileName);
    }
    startFileName = body.nextFileName;
  } while (startFileName);

  // Natural sort, so photo2 precedes photo10 whatever the naming scheme.
  return names.sort((a, b) => a.localeCompare(b, 'en', { numeric: true, sensitivity: 'base' }));
}

export const listAlbumPhotographs = cache(
  async (categoryId: string, albumId: string): Promise<string[]> => {
    if (missingConfig()) {
      console.warn('B2_KEY_ID / B2_APP_KEY / B2_BUCKET are unset — galleries will render empty.');
      return [];
    }

    const auth = await authorize();
    const files = await listFolder(auth, folderFor(categoryId, albumId));
    return files.map(
      (fileName) =>
        `${auth.downloadUrl}/file/${BUCKET}/${fileName.split('/').map(encodeURIComponent).join('/')}`,
    );
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
