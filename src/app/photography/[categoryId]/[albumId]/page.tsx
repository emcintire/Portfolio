import { notFound } from 'next/navigation';

import { GalleryView } from '@/components/GalleryView';
import { galleryCategories, getGalleryAlbum, getGalleryCategory } from '@/data/galleries';

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

export default async function PhotographyAlbumPage({ params }: { params: Promise<AlbumParams> }) {
  const { albumId, categoryId } = await params;
  const category = getGalleryCategory(categoryId);
  const album = getGalleryAlbum(categoryId, albumId);

  if (!category || !album) notFound();

  return <GalleryView album={album} category={category} />;
}
