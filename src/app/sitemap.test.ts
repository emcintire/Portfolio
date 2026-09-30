import { describe, expect, it, vi } from 'vitest';

import { galleryCategories } from '@/data/galleries';

import sitemap from './sitemap';

// B2 is mocked so the sitemap's own mapping is under test, not the network.
// Two photographs per album is enough to prove they reach the images field.
vi.mock('@/lib/b2', () => ({
  listAlbumPhotographs: vi.fn(async (categoryId: string, albumId: string) => [
    {
      height: 2000,
      src: `https://f000.backblazeb2.com/file/bucket/photos/${categoryId}/${albumId}/a.jpg`,
      width: 3000,
    },
    { src: `https://f000.backblazeb2.com/file/bucket/photos/${categoryId}/${albumId}/b.jpg` },
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

  // Categories are taken from the catalog rather than named, so editing albums
  // cannot break these.
  const directCategories = galleryCategories.filter((category) => category.directAlbum);
  const albumCategories = galleryCategories.filter((category) => !category.directAlbum);

  it('omits the direct-album URLs that redirect to their category', async () => {
    const urls = (await sitemap()).map((entry) => entry.url);

    for (const category of directCategories) {
      expect(urls).not.toContain(`${SITE}/photography/${category.id}/${category.directAlbum}`);
    }
  });

  it('attaches photographs to album URLs and to direct-album categories', async () => {
    const entries = await sitemap();
    const at = (url: string) => entries.find((entry) => entry.url === `${SITE}${url}`);
    // Every mocked album holds exactly MOCK_PHOTOGRAPHS.
    const MOCK_PHOTOGRAPHS = 2;

    for (const category of albumCategories) {
      for (const album of category.albums) {
        expect(at(`/photography/${category.id}/${album.id}`)?.images).toHaveLength(
          MOCK_PHOTOGRAPHS,
        );
      }
      // A category with real albums has no photographs of its own.
      expect(at(`/photography/${category.id}`)?.images).toBeUndefined();
    }
    // A directAlbum renders at its category URL, so its photographs ride there.
    for (const category of directCategories) {
      expect(at(`/photography/${category.id}`)?.images).toHaveLength(MOCK_PHOTOGRAPHS);
    }
  });
});
