import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { galleryCategories } from '@/data/galleries';
import type { Photograph } from '@/types';

import { GalleryView } from './GalleryView';

// Any album will do, taken from the catalog rather than named, so editing
// albums cannot break these.
const category = galleryCategories[0];
const album = category.albums[0];

// Photographs are listed from B2 by the page, so the component takes them as a
// prop and the test supplies its own — no network, no fixture data.
const makePhotographs = (count: number): Photograph[] =>
  Array.from({ length: count }, (_, index) => ({
    alt: index === 0 ? 'Mountain Range' : `Test photograph ${index + 1}`,
    src: `https://f000.backblazeb2.com/file/bucket/photos/test/album/${index}.jpg`,
  }));

describe('GalleryView', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows a spinner in each tile until its thumbnail loads', () => {
    const { container } = render(
      <GalleryView album={album} category={category} photographs={makePhotographs(1)} />,
    );
    const spinner = () => container.querySelector('.photo-grid__spinner');

    expect(spinner()).toBeInTheDocument();
    fireEvent.load(screen.getByRole('img'));
    expect(spinner()).not.toBeInTheDocument();
  });

  it('drops the spinner for a thumbnail that loaded before hydration', () => {
    // Its load event fired before React was listening, so it never arrives.
    vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(true);
    vi.spyOn(HTMLImageElement.prototype, 'naturalWidth', 'get').mockReturnValue(828);

    const { container } = render(
      <GalleryView album={album} category={category} photographs={makePhotographs(1)} />,
    );

    expect(container.querySelector('.photo-grid__spinner')).not.toBeInTheDocument();
  });

  it('renders every photograph at once and supports the lightbox keyboard flow', () => {
    const photographs = makePhotographs(30);
    render(<GalleryView album={album} category={category} photographs={photographs} />);

    // No paging: appending to CSS columns would reflow the photographs above.
    expect(screen.getAllByRole('listitem')).toHaveLength(photographs.length);
    expect(screen.queryByRole('button', { name: /load more/i })).not.toBeInTheDocument();
    fireEvent.click(
      screen.getByRole('button', {
        name: `Open Mountain Range, photograph 1 of ${photographs.length}`,
      }),
    );
    expect(screen.getByRole('dialog', { name: `${album.title} image viewer` })).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'ArrowRight' });
    expect(screen.getByText(`2 / ${photographs.length}`)).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it("reserves each photograph's shape before it loads", () => {
    const [sized, unsized] = makePhotographs(2);
    render(
      <GalleryView
        album={album}
        category={category}
        photographs={[{ ...sized, height: 2000, width: 3000 }, unsized]}
      />,
    );

    const [sizedTile, unsizedTile] = screen.getAllByRole('button', { name: /^Open / });
    // The ratio is what stops a tile growing from nothing as its image arrives.
    expect(sizedTile.style.aspectRatio).toBe('3000 / 2000');
    // Without a recorded size there is nothing to reserve, so no guess either.
    expect(unsizedTile.style.aspectRatio).toBe('');
  });

  it('routes thumbnails through the image optimizer rather than the bucket', () => {
    render(<GalleryView album={album} category={category} photographs={makePhotographs(1)} />);

    // Bucket originals are multi-megabyte; serving them straight into the grid
    // would ship tens of MB per page.
    const src = screen.getByRole('img').getAttribute('src') ?? '';
    expect(src).toMatch(/^\/_next\/image\?url=/);
    expect(src).toContain(encodeURIComponent('https://f000.backblazeb2.com'));
  });
});
