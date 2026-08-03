import { useParams } from 'react-router-dom';

import { GalleryView } from '@/components/GalleryView';
import { getGalleryAlbum, getGalleryCategory } from '@/data/galleries';

import NotFoundPage from './NotFoundPage';

export default function PhotographyAlbumPage() {
  const { albumId, categoryId } = useParams();
  const category = getGalleryCategory(categoryId);
  const album = getGalleryAlbum(categoryId, albumId);

  if (!category || !album) return <NotFoundPage />;

  return <GalleryView album={album} category={category} />;
}
