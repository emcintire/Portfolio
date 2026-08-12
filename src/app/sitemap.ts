import type { MetadataRoute } from 'next';

import { galleryCategories } from '@/data/galleries';
import { absoluteUrl } from '@/lib/seo';

/**
 * Generated from the gallery catalog rather than hand-maintained. The old
 * public/sitemap.xml had already drifted — adding an album meant remembering to
 * edit XML — and src/app/sitemap.test.ts now guards the mapping.
 *
 * Album entries carry their photographs in the `images` field so Google Images
 * can discover them. That field is `string[]`: it emits <image:loc> only, with
 * no caption slot, so alt text still reaches Google via the page's <img alt>.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const topLevel: MetadataRoute.Sitemap = [
    { changeFrequency: 'monthly', lastModified, priority: 1, url: absoluteUrl('/') },
    { changeFrequency: 'monthly', lastModified, priority: 0.9, url: absoluteUrl('/projects') },
    { changeFrequency: 'yearly', lastModified, priority: 0.8, url: absoluteUrl('/about') },
    { changeFrequency: 'monthly', lastModified, priority: 0.8, url: absoluteUrl('/photography') },
  ];

  const categories: MetadataRoute.Sitemap = galleryCategories.map((category) => {
    // A directAlbum category renders the gallery itself, so its photographs
    // belong to this URL — their nested album URL is excluded below.
    const directAlbum = category.albums.find((album) => album.id === category.directAlbum);

    return {
      changeFrequency: 'yearly',
      ...(directAlbum
        ? { images: directAlbum.photographs.map((photograph) => photograph.src) }
        : {}),
      lastModified,
      priority: 0.7,
      url: absoluteUrl(`/photography/${category.id}`),
    };
  });

  const albums: MetadataRoute.Sitemap = galleryCategories.flatMap((category) =>
    category.albums
      // Mirrors generateStaticParams: a directAlbum's nested URL 301s to the
      // category, so listing it would advertise a redirect.
      .filter((album) => album.id !== category.directAlbum)
      .map((album) => ({
        changeFrequency: 'yearly' as const,
        images: album.photographs.map((photograph) => photograph.src),
        lastModified,
        priority: 0.6,
        url: absoluteUrl(`/photography/${category.id}/${album.id}`),
      })),
  );

  return [...topLevel, ...categories, ...albums];
}
