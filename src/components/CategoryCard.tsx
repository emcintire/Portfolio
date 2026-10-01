import Image from 'next/image';
import Link from 'next/link';

import type { GalleryCategory } from '@/types';

type CategoryCardProps = {
  category: GalleryCategory;
  /** The cover's `sizes` hint, which depends on the grid the card sits in. */
  sizes: string;
};

/** A photography category card, shared by the home and photography index pages. */
export function CategoryCard({ category, sizes }: CategoryCardProps) {
  const albumCount = category.albums.length;

  return (
    <Link className="gallery-card" href={`/photography/${category.id}`}>
      <Image alt="" sizes={sizes} src={category.cardCover} />
      <span className="gallery-card__overlay">
        <strong>{category.title}</strong>
        <span className="gallery-card__description">{category.description}</span>
      </span>
      {/* A direct-album category opens straight onto one gallery, so "1 album" says nothing. */}
      {!category.directAlbum && (
        <span className="gallery-card__badge">
          {albumCount} {albumCount === 1 ? 'album' : 'albums'}
        </span>
      )}
    </Link>
  );
}
