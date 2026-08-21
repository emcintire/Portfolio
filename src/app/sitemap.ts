import type { MetadataRoute } from 'next';

import { galleryCategories } from '@/data/galleries';
import { listAlbumPhotographs } from '@/lib/b2';
import { absoluteUrl } from '@/lib/seo';

/**
 * Generated from the gallery catalog rather than hand-maintained. The old
 * public/sitemap.xml had already drifted — adding an album meant remembering to
 * edit XML.
 *
 * Album entries carry their photographs in the `images` field so Google Images
 * can discover them. That field is `string[]`: it emits <image:loc> only, with
 * no caption slot, so alt text reaches Google via the page's <img alt>.
 *
 * Photographs are listed from B2, so this shares the routes' revalidation
 * interval — new photographs appear in the sitemap without a deploy.
 */
// Next statically analyses this, so it must stay a literal —
// keep it in step with PHOTO_REVALIDATE_SECONDS in src/lib/b2.ts.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const topLevel: MetadataRoute.Sitemap = [
    { changeFrequency: 'monthly', lastModified, priority: 1, url: absoluteUrl('/') },
    { changeFrequency: 'monthly', lastModified, priority: 0.9, url: absoluteUrl('/projects') },
    { changeFrequency: 'yearly', lastModified, priority: 0.8, url: absoluteUrl('/about') },
    { changeFrequency: 'monthly', lastModified, priority: 0.8, url: absoluteUrl('/photography') },
  ];

  const categories: MetadataRoute.Sitemap = await Promise.all(
    galleryCategories.map(async (category) => {
      // A directAlbum category renders the gallery itself, so its photographs
      // belong to this URL — their nested album URL is excluded below.
      const directAlbum = category.albums.find((album) => album.id === category.directAlbum);
      const images = directAlbum
        ? await listAlbumPhotographs(category.id, directAlbum.id)
        : undefined;

      return {
        changeFrequency: 'yearly' as const,
        ...(images?.length ? { images } : {}),
        lastModified,
        priority: 0.7,
        url: absoluteUrl(`/photography/${category.id}`),
      };
    }),
  );

  const albums: MetadataRoute.Sitemap = await Promise.all(
    galleryCategories.flatMap((category) =>
      category.albums
        // Mirrors generateStaticParams: a directAlbum's nested URL 301s to the
        // category, so listing it would advertise a redirect.
        .filter((album) => album.id !== category.directAlbum)
        .map(async (album) => {
          const images = await listAlbumPhotographs(category.id, album.id);

          return {
            changeFrequency: 'yearly' as const,
            ...(images.length ? { images } : {}),
            lastModified,
            priority: 0.6,
            url: absoluteUrl(`/photography/${category.id}/${album.id}`),
          };
        }),
    ),
  );

  return [...topLevel, ...categories, ...albums];
}
