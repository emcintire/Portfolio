import type { APIRequestContext } from '@playwright/test';

/**
 * Path of an album page that has photographs, found in the live sitemap.
 *
 * Tests never name an album or count its photographs: albums come and go in the
 * catalog, and photographs in the bucket, without anyone touching the tests.
 */
export async function albumWithPhotographs(request: APIRequestContext) {
  const xml = await (await request.get('/sitemap.xml')).text();

  for (const [, entry] of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = entry.match(/<loc>([^<]*)<\/loc>/)?.[1];
    if (!loc || !entry.includes('<image:loc>')) continue;

    const path = new URL(loc).pathname;
    if (/^\/photography\/[^/]+\/[^/]+$/.test(path)) return path;
  }

  throw new Error('The sitemap lists no album with photographs.');
}
