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

/**
 * Photographs are listed from the B2 bucket rather than stored here, so pages
 * are rebuilt in the background on this interval. New photographs appear on
 * their own — no commit, no deploy — while crawlers still get complete HTML
 * rather than an empty grid waiting on client-side JavaScript.
 */
// Next statically analyses this, so it must stay a literal —
// keep it in step with PHOTO_REVALIDATE_SECONDS in src/lib/b2.ts.
export const revalidate = 3600;

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

const albumDescription = (album: GalleryAlbum, category: GalleryCategory, count: number) => {
  const base = album.description ?? `${category.description} Photographed by ${siteMetadata.name}.`;
  const where = album.location ? ` ${album.location}.` : '';
  const when = album.year ? ` ${album.year}.` : '';
  const many = count ? ` ${count} photographs.` : '';

  return `${base}${where}${when}${many}`;
};

/** Alt text is not stored, so it is derived from the album it belongs to. */
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

  // Deduped with the page's own call, so this costs no extra B2 request.
  const sources = await listAlbumPhotographs(categoryId, albumId);

  return buildMetadata({
    description: albumDescription(album, category, sources.length),
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
