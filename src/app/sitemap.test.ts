import { describe, expect, it, vi } from 'vitest';

import { galleryCategories } from '@/data/galleries';

import sitemap from './sitemap';

// B2 is mocked so the sitemap's own mapping is under test, not the network.
// Two photographs per album is enough to prove they reach the images field.
vi.mock('@/lib/b2', () => ({
  listAlbumPhotographs: vi.fn(async (categoryId: string, albumId: string) => [
    `https://f000.backblazeb2.com/file/bucket/photos/${categoryId}/${albumId}/a.jpg`,
    `https://f000.backblazeb2.com/file/bucket/photos/${categoryId}/${albumId}/b.jpg`,
  ]),
}));

const SITE = 'https://everettgsm.com';

/**
 * Guards the drift that made the previous hand-written public/sitemap.xml go
 * stale: adding an album to the catalog must add it to the sitemap.
 */
describe('sitemap', () => {
  it('lists every prerendered route exactly once', async () => {
    const urls = (await sitemap()).map((entry) => entry.url);

    const expected = [
      '/',
      '/projects',
      '/about',
      '/photography',
      ...galleryCategories.map((category) => `/photography/${category.id}`),
      ...galleryCategories.flatMap((category) =>
        category.albums
          .filter((album) => album.id !== category.directAlbum)
          .map((album) => `/photography/${category.id}/${album.id}`),
      ),
    ].map((path) => `${SITE}${path === '/' ? '/' : path}`);

    expect(new Set(urls).size).toBe(urls.length);
    expect(new Set(urls)).toEqual(new Set(expected));
  });

  it('omits the direct-album URLs that redirect to their category', async () => {
    const urls = (await sitemap()).map((entry) => entry.url);

    expect(urls).not.toContain(`${SITE}/photography/animals/animals`);
    expect(urls).not.toContain(`${SITE}/photography/misc/misc`);
  });

  it('attaches photographs to album URLs and to direct-album categories', async () => {
    const entries = await sitemap();
    const at = (url: string) => entries.find((entry) => entry.url === `${SITE}${url}`);

    expect(at('/photography/landscape/rockies2024')?.images).toHaveLength(2);
    // A directAlbum renders at its category URL, so its photographs ride there.
    expect(at('/photography/animals')?.images).toHaveLength(2);
    // A category with real albums has no photographs of its own.
    expect(at('/photography/landscape')?.images).toBeUndefined();
  });
});
