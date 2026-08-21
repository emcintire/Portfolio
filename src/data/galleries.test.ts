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
    expect(getGalleryCategory('landscape')?.title).toBe('Landscape');
    expect(getGalleryAlbum('landscape', 'adirondacks2025')?.year).toBe('2025');
    expect(getGalleryCategory('unknown')).toBeUndefined();
    expect(getGalleryAlbum('landscape', 'unknown')).toBeUndefined();
  });
});
