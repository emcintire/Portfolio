import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { GalleryView } from '@/components/GalleryView';
import { galleryCategories, getGalleryAlbum, getGalleryCategory } from '@/data/galleries';
import { siteMetadata } from '@/data/site';
import { listAlbumPhotographs } from '@/lib/b2';
import { JsonLd } from '@/lib/JsonLd';
import { breadcrumbSchema, imageGallerySchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';
import type { GalleryAlbum, GalleryCategory } from '@/types';

type AlbumParams = { albumId: string; categoryId: string };

export const dynamicParams = false;

export const revalidate = 300;

export function generateStaticParams(): AlbumParams[] {
  return galleryCategories.flatMap((category) =>
    category.albums
      .filter((album) => album.id !== category.directAlbum)
      .map((album) => ({ albumId: album.id, categoryId: category.id })),
  );
}

const albumDescription = (album: GalleryAlbum, category: GalleryCategory, count: number) => {
  const base = album.description ?? `${category.description} Photographed by ${siteMetadata.name}.`;
  const where = album.location ? ` ${album.location}.` : '';
  const when = album.year ? ` ${album.year}.` : '';
  const many = count ? ` ${count} photographs.` : '';

  return `${base}${where}${when}${many}`;
};

const toPhotographs = (sources: string[], album: GalleryAlbum) =>
  sources.map((src, index) => ({ alt: `${album.title} photograph ${index + 1}`, src }));

export async function generateMetadata({
  params,
}: {
  params: Promise<AlbumParams>;
}): Promise<Metadata> {
  const { albumId, categoryId } = await params;
  const category = getGalleryCategory(categoryId);
  const album = getGalleryAlbum(categoryId, albumId);
  if (!category || !album) return {};

  const sources = await listAlbumPhotographs(categoryId, albumId);

  return buildMetadata({
    description: albumDescription(album, category, sources.length),
    path: `/photography/${category.id}/${album.id}`,
    title: `${album.title}${album.year ? ` ${album.year}` : ''} — ${category.title} Photography`,
  });
}

export default async function PhotographyAlbumPage({ params }: { params: Promise<AlbumParams> }) {
  const { albumId, categoryId } = await params;
  const category = getGalleryCategory(categoryId);
  const album = getGalleryAlbum(categoryId, albumId);

  if (!category || !album) notFound();

  const path = `/photography/${category.id}/${album.id}`;
  const photographs = toPhotographs(await listAlbumPhotographs(categoryId, albumId), album);

  return (
    <>
      <JsonLd data={imageGallerySchema(album, category, path, photographs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Photography', path: '/photography' },
          { name: category.title, path: `/photography/${category.id}` },
          { name: album.title, path },
        ])}
      />
      <GalleryView album={album} category={category} photographs={photographs} />
    </>
  );
}
