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

  it('resolves known routes and rejects unknown routes', () => {
    // Taken from the catalog rather than named, so editing albums cannot break it.
    for (const category of galleryCategories) {
      expect(getGalleryCategory(category.id)).toBe(category);
      for (const album of category.albums) {
        expect(getGalleryAlbum(category.id, album.id)).toBe(album);
      }
      expect(getGalleryAlbum(category.id, 'unknown')).toBeUndefined();
    }
    expect(getGalleryCategory('unknown')).toBeUndefined();
  });
});
