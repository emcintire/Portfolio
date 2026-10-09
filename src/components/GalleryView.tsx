'use client';

import Link from 'next/link';
import { type CSSProperties, useCallback, useMemo, useRef, useState } from 'react';

import type { GalleryAlbum, GalleryCategory, Photograph } from '@/types';

import { PhotoGridSize, usePhotoColumns } from './PhotoGridSize';
import { PhotoLightbox } from './PhotoLightbox';
import { SplitWords } from './SplitWords';

/**
 * Thumbnail widths on offer, so the browser can fetch sharper copies when the
 * columns slider makes tiles larger. Each must be one of Next's configured
 * image sizes, or the optimizer rejects it.
 */
const THUMBNAIL_WIDTHS = [384, 640, 828, 1080, 1200, 1920];
/** The `src` fallback for browsers without srcset: the four-column desktop tile. */
const FALLBACK_WIDTH = 828;
const THUMBNAIL_QUALITY = 75;

type GalleryViewProps = {
  album: GalleryAlbum;
  category: GalleryCategory;
  photographs: Photograph[];
};

const thumbnailUrl = (src: string, width: number) =>
  `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${THUMBNAIL_QUALITY}`;

const thumbnailSrcSet = (src: string) =>
  THUMBNAIL_WIDTHS.map((width) => `${thumbnailUrl(src, width)} ${width}w`).join(', ');

type LoadState = 'pending' | 'cached' | 'fresh';

function GalleryThumbnail({ alt, sizes, src }: { alt: string; sizes: string; src: string }) {
  const [hasFailed, setHasFailed] = useState(false);
  const [loadState, setLoadState] = useState<LoadState>('pending');

  // An image can finish before hydration attaches onLoad, and then the event
  // never reaches React — so also check on mount whether it already arrived.
  const detectLoaded = useCallback((image: HTMLImageElement | null) => {
    if (image?.complete && image.naturalWidth > 0) setLoadState('cached');
  }, []);

  if (hasFailed) {
    return <span className="photo-grid__fallback">Photograph unavailable</span>;
  }

  return (
    <>
      {loadState === 'pending' && <span aria-hidden="true" className="photo-grid__spinner" />}
      {/* eslint-disable-next-line @next/next/no-img-element -- see thumbnailUrl */}
      <img
        alt={alt}
        data-load={loadState}
        decoding="async"
        loading="lazy"
        onError={() => setHasFailed(true)}
        onLoad={() => setLoadState((state) => (state === 'pending' ? 'fresh' : state))}
        ref={detectLoaded}
        sizes={sizes}
        src={thumbnailUrl(src, FALLBACK_WIDTH)}
        srcSet={thumbnailSrcSet(src)}
      />
    </>
  );
}

export function GalleryView({ album, category, photographs: source }: GalleryViewProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [viewedAlbumId, setViewedAlbumId] = useState(album.id);
  const lastFocusedPhotoRef = useRef<HTMLButtonElement | null>(null);
  const { columns, sizes, ...gridSize } = usePhotoColumns();
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
        <h1>
          <SplitWords text={album.title} />
        </h1>
        <div className="album-page__meta">
          <p>{photographs.length} photographs</p>
          <PhotoGridSize {...gridSize} />
        </div>
      </div>

      <ul
        aria-label={`${album.title} photographs`}
        className="photo-grid"
        data-columns={columns ?? undefined}
        style={columns ? ({ '--photo-columns': columns } as CSSProperties) : undefined}
      >
        {photographs.map((photograph, index) => {
          const alt = photograph.alt.trim() || `${album.title} photograph ${index + 1}`;
          return (
            <li key={`${photograph.src}-${index}`}>
              <button
                aria-label={`Open ${alt}, photograph ${index + 1} of ${photographs.length}`}
                className="photo-grid__button"
                data-cursor-label="View"
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
                <GalleryThumbnail alt={alt} sizes={sizes} src={photograph.src} />
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
