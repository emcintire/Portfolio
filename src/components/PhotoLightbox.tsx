'use client';

import { useEffect, useRef, useState } from 'react';

import type { Photograph } from '@/types';

import { Icon } from './Icon';

type PhotoLightboxProps = {
  albumTitle: string;
  currentIndex: number;
  onClose: () => void;
  onSelect: (index: number) => void;
  photographs: Photograph[];
};

export function PhotoLightbox({
  albumTitle,
  currentIndex,
  onClose,
  onSelect,
  photographs,
}: PhotoLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const currentPhoto = photographs[currentIndex];
  const hasImageFailed = currentPhoto !== undefined && failedSrc === currentPhoto.src;

  useEffect(() => {
    const { body, documentElement: root } = document;
    const previousOverflow = { body: body.style.overflow, root: root.style.overflow };
    body.style.overflow = 'hidden';
    root.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') {
        onSelect((currentIndex - 1 + photographs.length) % photographs.length);
      }
      if (event.key === 'ArrowRight') {
        onSelect((currentIndex + 1) % photographs.length);
      }
      if (event.key === 'Tab') {
        const focusableElements = Array.from(
          dialogRef.current?.querySelectorAll<HTMLElement>('button:not([tabindex="-1"])') ?? [],
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements.at(-1);

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      body.style.overflow = previousOverflow.body;
      root.style.overflow = previousOverflow.root;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, onClose, onSelect, photographs.length]);

  if (!currentPhoto) return null;

  const alt = currentPhoto.alt.trim() || `${albumTitle} photograph ${currentIndex + 1}`;

  return (
    <div
      aria-label={`${albumTitle} image viewer`}
      aria-modal="true"
      className="lightbox"
      ref={dialogRef}
      role="dialog"
    >
      <button
        aria-label="Close image viewer"
        className="lightbox__backdrop"
        onClick={onClose}
        tabIndex={-1}
        type="button"
      />
      <div className="lightbox__content">
        {hasImageFailed ? (
          <div className="lightbox__fallback" role="status">
            This photograph could not be loaded.
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt={alt}
            decoding="async"
            onError={() => setFailedSrc(currentPhoto.src)}
            src={currentPhoto.src}
          />
        )}
        <div className="lightbox__controls">
          <button
            aria-label="Previous photograph"
            className="icon-button"
            onClick={() => onSelect((currentIndex - 1 + photographs.length) % photographs.length)}
            type="button"
          >
            <Icon name="arrow-left" />
          </button>
          <p aria-live="polite">
            {currentIndex + 1} / {photographs.length}
          </p>
          <button
            aria-label="Next photograph"
            className="icon-button"
            onClick={() => onSelect((currentIndex + 1) % photographs.length)}
            type="button"
          >
            <Icon name="arrow-right" />
          </button>
        </div>
      </div>
      <button
        aria-label="Close image viewer"
        className="icon-button lightbox__close"
        onClick={onClose}
        ref={closeButtonRef}
        type="button"
      >
        <Icon name="close" />
      </button>
    </div>
  );
}
