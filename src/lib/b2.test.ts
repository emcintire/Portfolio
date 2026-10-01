import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('server-only', () => ({}));

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status });

const authorization = () =>
  json({
    accountId: 'account',
    apiInfo: {
      storageApi: {
        apiUrl: 'https://api.example.com',
        bucketId: 'bucket-id',
        downloadUrl: 'https://f000.example.com',
      },
    },
    authorizationToken: 'token',
  });

const listing = () =>
  json({
    files: [
      {
        action: 'upload',
        fileInfo: { height: '2000', width: '3000' },
        fileName: 'category/album/a.jpg',
      },
    ],
    nextFileName: null,
  });

// How fetch() reports a dropped connection: a bare "fetch failed", the real error on its cause.
const dropped = () =>
  new TypeError('fetch failed', {
    cause: Object.assign(new Error('other side closed'), { code: 'UND_ERR_SOCKET' }),
  });

/**
 * Serves authorization normally and each listing request from `listings` in
 * order, repeating the last one once the rest are used up.
 */
function stubB2(listings: Array<() => Response | Promise<never>>) {
  const listingCalls = vi.fn();
  vi.stubGlobal(
    'fetch',
    vi.fn(async (url: string | URL) => {
      if (String(url).includes('b2_authorize_account')) return authorization();
      listingCalls();
      const next = listings.length > 1 ? listings.shift()! : listings[0];
      return next();
    }),
  );
  return listingCalls;
}

async function loadB2() {
  vi.resetModules();
  vi.stubEnv('B2_KEY_ID', 'key');
  vi.stubEnv('B2_APP_KEY', 'secret');
  vi.stubEnv('B2_BUCKET', 'bucket');
  return import('./b2');
}

describe('B2 listing', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it('rides out dropped connections instead of failing the build', async () => {
    vi.useFakeTimers();
    const fail = () => Promise.reject(dropped());
    const listingCalls = stubB2([fail, fail, listing]);
    const { listAlbumPhotographs } = await loadB2();

    const result = listAlbumPhotographs('category', 'album');
    await vi.runAllTimersAsync();

    await expect(result).resolves.toEqual([
      {
        height: 2000,
        src: 'https://f000.example.com/file/bucket/category/album/a.jpg',
        width: 3000,
      },
    ]);
    expect(listingCalls).toHaveBeenCalledTimes(3);
  });

  it('names the underlying network error when it finally gives up', async () => {
    vi.useFakeTimers();
    const listingCalls = stubB2([() => Promise.reject(dropped())]);
    const { listAlbumPhotographs } = await loadB2();

    // Attach the expectation before the timers run, so the rejection is never unhandled.
    const assertion = expect(listAlbumPhotographs('category', 'album')).rejects.toThrow(
      'b2_list_file_names failed after 5 attempts: fetch failed (UND_ERR_SOCKET: other side closed)',
    );
    await vi.runAllTimersAsync();
    await assertion;
    expect(listingCalls).toHaveBeenCalledTimes(5);
  });

  it('does not retry a request B2 rejected outright', async () => {
    const listingCalls = stubB2([() => json({ code: 'unauthorized' }, 401)]);
    const { listAlbumPhotographs } = await loadB2();

    await expect(listAlbumPhotographs('category', 'album')).rejects.toThrow(
      'b2_list_file_names failed: 401',
    );
    expect(listingCalls).toHaveBeenCalledTimes(1);
  });
});
