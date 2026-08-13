import { describe, expect, it } from 'vitest';

import { galleryCategories } from '@/data/galleries';

import sitemap from './sitemap';

/**
 * Guards the drift that made the previous hand-written public/sitemap.xml go
 * stale: adding an album to the catalog must add it to the sitemap.
 */
describe('sitemap', () => {
  const entries = sitemap();
  const urls = entries.map((entry) => entry.url);

  it('lists every prerendered route exactly once', () => {
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
    ].map((path) => `https://everettgsm.com${path === '/' ? '/' : path}`);

    expect(new Set(urls).size).toBe(urls.length);
    expect(new Set(urls)).toEqual(new Set(expected));
  });

  it('omits the direct-album URLs that redirect to their category', () => {
    expect(urls).not.toContain('https://everettgsm.com/photography/animals/animals');
    expect(urls).not.toContain('https://everettgsm.com/photography/misc/misc');
  });

  it('attaches every photograph to a listed URL, including the direct-album categories', () => {
    // A directAlbum's photographs ride on its category URL, since its own album
    // URL is excluded above. Missing that silently drops them from the image
    // sitemap — 33 of them, across animals and misc.
    //
    // Counted, not de-duplicated: a handful of photographs legitimately appear
    // in more than one album, and each album URL should list its own.
    const photographCount = galleryCategories.reduce(
      (total, category) =>
        total + category.albums.reduce((sum, album) => sum + album.photographs.length, 0),
      0,
    );

    expect(entries.flatMap((entry) => entry.images ?? [])).toHaveLength(photographCount);
  });

  it('lists the direct-album photographs on the category URL', () => {
    const animals = entries.find(
      (entry) => entry.url === 'https://everettgsm.com/photography/animals',
    );

    expect(animals?.images ?? []).toHaveLength(24);
  });
});
