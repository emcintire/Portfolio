import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { getGalleryCategory } from '@/data/galleries';

import { GalleryView } from './GalleryView';

describe('GalleryView', () => {
  it('progressively reveals photographs and supports the lightbox keyboard flow', () => {
    const category = getGalleryCategory('landscape');
    const album = category?.albums.find((entry) => entry.id === 'rockies2024');
    if (!category || !album) throw new Error('Expected test album');

    render(<GalleryView album={album} category={category} />);

    expect(screen.getAllByRole('listitem')).toHaveLength(24);
    fireEvent.click(
      screen.getByRole('button', {
        name: `Open Mountain Range, photograph 1 of ${album.photographs.length}`,
      }),
    );
    expect(screen.getByRole('dialog', { name: /Rockies image viewer/i })).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'ArrowRight' });
    expect(screen.getByText(`2 / ${album.photographs.length}`)).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Load more photographs' }));
    expect(screen.getAllByRole('listitem')).toHaveLength(album.photographs.length);
  });
});
