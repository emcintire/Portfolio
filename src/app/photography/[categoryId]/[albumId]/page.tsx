import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { GalleryView } from '@/components/GalleryView';
import { galleryCategories, getGalleryAlbum, getGalleryCategory } from '@/data/galleries';
import { siteMetadata } from '@/data/site';
import { JsonLd } from '@/lib/JsonLd';
import { breadcrumbSchema, imageGallerySchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';
import type { GalleryAlbum, GalleryCategory } from '@/types';

type AlbumParams = { albumId: string; categoryId: string };

export const dynamicParams = false;

export function generateStaticParams(): AlbumParams[] {
  return galleryCategories.flatMap((category) =>
    category.albums
      // A directAlbum category renders this same gallery at the category URL,
      // so prerendering the nested URL too would be duplicate content. It 301s
      // to the category instead (see next.config.ts).
      .filter((album) => album.id !== category.directAlbum)
      .map((album) => ({ albumId: album.id, categoryId: category.id })),
  );
}

const albumDescription = (album: GalleryAlbum, category: GalleryCategory) => {
  const base = album.description ?? `${category.description} Photographed by ${siteMetadata.name}.`;
  const where = album.location ? ` ${album.location}.` : '';
  const when = album.year ? ` ${album.year}.` : '';

  return `${base}${where}${when} ${album.photographs.length} photographs.`;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<AlbumParams>;
}): Promise<Metadata> {
  const { albumId, categoryId } = await params;
  const category = getGalleryCategory(categoryId);
  const album = getGalleryAlbum(categoryId, albumId);
  if (!category || !album) return {};

  return buildMetadata({
    description: albumDescription(album, category),
    path: `/photography/${category.id}/${album.id}`,
    // The year is part of the title, not decoration: two landscape albums are
    // both called "Alaska", and without it they compete for the same title.
    title: `${album.title}${album.year ? ` ${album.year}` : ''} — ${category.title} Photography`,
  });
}

export default async function PhotographyAlbumPage({ params }: { params: Promise<AlbumParams> }) {
  const { albumId, categoryId } = await params;
  const category = getGalleryCategory(categoryId);
  const album = getGalleryAlbum(categoryId, albumId);

  if (!category || !album) notFound();

  const path = `/photography/${category.id}/${album.id}`;

  return (
    <>
      <JsonLd data={imageGallerySchema(album, category, path)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Photography', path: '/photography' },
          { name: category.title, path: `/photography/${category.id}` },
          { name: album.title, path },
        ])}
      />
      <GalleryView album={album} category={category} />
    </>
  );
}
