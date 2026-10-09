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

/**
 * Paths of categories that open straight onto their one gallery, found in the
 * live sitemap: they are the only category URLs that list photographs.
 */
export async function singleAlbumCategories(request: APIRequestContext) {
  const xml = await (await request.get('/sitemap.xml')).text();
  const paths: string[] = [];

  for (const [, entry] of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = entry.match(/<loc>([^<]*)<\/loc>/)?.[1];
    if (!loc || !entry.includes('<image:loc>')) continue;

    const path = new URL(loc).pathname;
    if (/^\/photography\/[^/]+$/.test(path)) paths.push(path);
  }

  if (!paths.length) throw new Error('The sitemap lists no single-album category.');
  return paths;
}
