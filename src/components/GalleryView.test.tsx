import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { getGalleryCategory } from '@/data/galleries';
import type { Photograph } from '@/types';

import { GalleryView } from './GalleryView';

// Photographs are listed from B2 by the page, so the component takes them as a
// prop and the test supplies its own — no network, no fixture data.
const makePhotographs = (count: number): Photograph[] =>
  Array.from({ length: count }, (_, index) => ({
    alt: index === 0 ? 'Mountain Range' : `Rockies photograph ${index + 1}`,
    src: `https://f000.backblazeb2.com/file/bucket/photos/landscape/rockies2024/${index}.jpg`,
  }));

describe('GalleryView', () => {
  it('progressively reveals photographs and supports the lightbox keyboard flow', () => {
    const category = getGalleryCategory('landscape');
    const album = category?.albums.find((entry) => entry.id === 'rockies2024');
    if (!category || !album) throw new Error('Expected test album');

    const photographs = makePhotographs(26);
    render(<GalleryView album={album} category={category} photographs={photographs} />);

    expect(screen.getAllByRole('listitem')).toHaveLength(24);
    fireEvent.click(
      screen.getByRole('button', {
        name: `Open Mountain Range, photograph 1 of ${photographs.length}`,
      }),
    );
    expect(screen.getByRole('dialog', { name: /Rockies image viewer/i })).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'ArrowRight' });
    expect(screen.getByText(`2 / ${photographs.length}`)).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Load more photographs' }));
    expect(screen.getAllByRole('listitem')).toHaveLength(photographs.length);
  });

  it('routes thumbnails through the image optimizer rather than the bucket', () => {
    const category = getGalleryCategory('landscape');
    const album = category?.albums.find((entry) => entry.id === 'rockies2024');
    if (!category || !album) throw new Error('Expected test album');

    render(<GalleryView album={album} category={category} photographs={makePhotographs(1)} />);

    // Bucket originals are multi-megabyte; serving them straight into the grid
    // would ship tens of MB per page.
    const src = screen.getByRole('img').getAttribute('src') ?? '';
    expect(src).toMatch(/^\/_next\/image\?url=/);
    expect(src).toContain(encodeURIComponent('https://f000.backblazeb2.com'));
  });
});
