import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import type { GalleryAlbum, GalleryCategory } from '@/types';

import { PhotoLightbox } from './PhotoLightbox';

const PAGE_SIZE = 24;

const normalizeSource = (source: string) =>
  source.replace('https://imgur.com/', 'https://i.imgur.com/');

type GalleryViewProps = {
  album: GalleryAlbum;
  category: GalleryCategory;
};

function GalleryThumbnail({ alt, source }: { alt: string; source: string }) {
  const [hasFailed, setHasFailed] = useState(false);

  if (hasFailed) {
    return <span className="photo-grid__fallback">Photograph unavailable</span>;
  }

  return (
    <img
      alt={alt}
      decoding="async"
      height="768"
      loading="lazy"
      onError={() => setHasFailed(true)}
      src={normalizeSource(source)}
      width="1024"
    />
  );
}

export function GalleryView({ album, category }: GalleryViewProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const lastFocusedPhotoRef = useRef<HTMLButtonElement | null>(null);
  const photographs = useMemo(
    () => album.photographs.filter((photograph) => photograph.src.trim()),
    [album.photographs],
  );

  useEffect(() => {
    setSelectedIndex(null);
    setVisibleCount(PAGE_SIZE);
  }, [album.id]);

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
    window.requestAnimationFrame(() => lastFocusedPhotoRef.current?.focus());
  }, []);
  const selectLightboxPhoto = useCallback((index: number) => setSelectedIndex(index), []);

  return (
    <div className="album-page">
      <div className="page-container album-page__header">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link to="/photography">Photography</Link>
          <span aria-hidden="true">/</span>
          {category.directAlbum ? (
            <span aria-current="page">{category.title}</span>
          ) : (
            <>
              <Link to={`/photography/${category.id}`}>{category.title}</Link>
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
        {photographs.slice(0, visibleCount).map((photograph, index) => {
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
                type="button"
              >
                <GalleryThumbnail alt={alt} source={photograph.src} />
              </button>
            </li>
          );
        })}
      </ul>

      {visibleCount < photographs.length && (
        <div className="load-more">
          <button
            className="button button--secondary"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            type="button"
          >
            Load more photographs
          </button>
        </div>
      )}

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
