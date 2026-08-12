import { describe, expect, it } from 'vitest';

import { galleryCategories, getGalleryAlbum, getGalleryCategory } from './galleries';

describe('gallery catalog', () => {
  it('uses unique category and album identifiers', () => {
    const categoryIds = galleryCategories.map((category) => category.id);
    const albumIds = galleryCategories.flatMap((category) =>
      category.albums.map((album) => album.id),
    );

    expect(new Set(categoryIds).size).toBe(categoryIds.length);
    expect(new Set(albumIds).size).toBe(albumIds.length);
  });

  it('provides valid sources and useful alt text for every photograph', () => {
    for (const category of galleryCategories) {
      for (const album of category.albums) {
        expect(album.photographs.length).toBeGreaterThan(0);
        for (const photograph of album.photographs) {
          expect(photograph.src.trim()).not.toBe('');
          expect(photograph.alt.trim()).not.toBe('');
        }
      }
    }
  });

  it('serves every photograph from the direct image host', () => {
    // Thumbnails are rendered straight from the catalog with no runtime rewrite,
    // so a bare imgur.com URL would silently fall back to "Photograph unavailable".
    for (const category of galleryCategories) {
      for (const album of category.albums) {
        for (const photograph of album.photographs) {
          expect(photograph.src.startsWith('https://i.imgur.com/')).toBe(true);
        }
      }
    }
  });

  it('resolves known routes and rejects unknown routes', () => {
    expect(getGalleryCategory('landscape')?.title).toBe('Landscape');
    expect(getGalleryAlbum('landscape', 'adirondacks2025')?.year).toBe('2025');
    expect(getGalleryCategory('unknown')).toBeUndefined();
    expect(getGalleryAlbum('landscape', 'unknown')).toBeUndefined();
  });
});
