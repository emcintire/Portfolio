'use client';

import Link from 'next/link';
import { useCallback, useMemo, useRef, useState } from 'react';

import type { GalleryAlbum, GalleryCategory, Photograph } from '@/types';

import { PhotoLightbox } from './PhotoLightbox';

/** Widest a grid column gets, at the four-column desktop layout. */
const THUMBNAIL_WIDTH = 828;
const THUMBNAIL_QUALITY = 75;

type GalleryViewProps = {
  album: GalleryAlbum;
  category: GalleryCategory;
  photographs: Photograph[];
};

const thumbnailUrl = (src: string) =>
  `/_next/image?url=${encodeURIComponent(src)}&w=${THUMBNAIL_WIDTH}&q=${THUMBNAIL_QUALITY}`;

function GalleryThumbnail({ alt, src }: { alt: string; src: string }) {
  const [hasFailed, setHasFailed] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  // An image can finish before hydration attaches onLoad, and then the event
  // never reaches React — so also check on mount whether it already arrived.
  const detectLoaded = useCallback((image: HTMLImageElement | null) => {
    if (image?.complete && image.naturalWidth > 0) setHasLoaded(true);
  }, []);

  if (hasFailed) {
    return <span className="photo-grid__fallback">Photograph unavailable</span>;
  }

  return (
    <>
      {!hasLoaded && <span aria-hidden="true" className="photo-grid__spinner" />}
      {/* eslint-disable-next-line @next/next/no-img-element -- see thumbnailUrl */}
      <img
        alt={alt}
        decoding="async"
        loading="lazy"
        onError={() => setHasFailed(true)}
        onLoad={() => setHasLoaded(true)}
        ref={detectLoaded}
        src={thumbnailUrl(src)}
      />
    </>
  );
}

export function GalleryView({ album, category, photographs: source }: GalleryViewProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [viewedAlbumId, setViewedAlbumId] = useState(album.id);
  const lastFocusedPhotoRef = useRef<HTMLButtonElement | null>(null);
  const photographs = useMemo(() => source.filter((photograph) => photograph.src.trim()), [source]);

  if (album.id !== viewedAlbumId) {
    setViewedAlbumId(album.id);
    setSelectedIndex(null);
  }

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
    window.requestAnimationFrame(() => lastFocusedPhotoRef.current?.focus());
  }, []);
  const selectLightboxPhoto = useCallback((index: number) => setSelectedIndex(index), []);

  return (
    <div className="album-page">
      <div className="page-container album-page__header">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/photography">Photography</Link>
          <span aria-hidden="true">/</span>
          {category.directAlbum ? (
            <span aria-current="page">{category.title}</span>
          ) : (
            <>
              <Link href={`/photography/${category.id}`}>{category.title}</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{album.title}</span>
            </>
          )}
        </nav>
        <p className="eyebrow">{album.year ?? category.title}</p>
        <h1>{album.title}</h1>
        <p>{photographs.length} photographs</p>
      </div>

      <ul className="photo-grid" aria-label={`${album.title} photographs`}>
        {photographs.map((photograph, index) => {
          const alt = photograph.alt.trim() || `${album.title} photograph ${index + 1}`;
          return (
            <li key={`${photograph.src}-${index}`}>
              <button
                aria-label={`Open ${alt}, photograph ${index + 1} of ${photographs.length}`}
                className="photo-grid__button"
                onClick={(event) => {
                  lastFocusedPhotoRef.current = event.currentTarget;
                  setSelectedIndex(index);
                }}
                style={
                  photograph.width && photograph.height
                    ? { aspectRatio: `${photograph.width} / ${photograph.height}` }
                    : undefined
                }
                type="button"
              >
                <GalleryThumbnail alt={alt} src={photograph.src} />
              </button>
            </li>
          );
        })}
      </ul>

      {selectedIndex !== null && (
        <PhotoLightbox
          albumTitle={album.title}
          currentIndex={selectedIndex}
          onClose={closeLightbox}
          onSelect={selectLightboxPhoto}
          photographs={photographs}
        />
      )}
    </div>
  );
}
