import type { MetadataRoute } from 'next';

import { galleryCategories } from '@/data/galleries';
import { listAlbumPhotographs } from '@/lib/b2';
import { absoluteUrl } from '@/lib/seo';

const imageUrls = async (categoryId: string, albumId: string) =>
  (await listAlbumPhotographs(categoryId, albumId)).map(({ src }) => src);

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
      const images = directAlbum ? await imageUrls(category.id, directAlbum.id) : undefined;

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
          const images = await imageUrls(category.id, album.id);

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
