import { ImageResponse } from 'next/og';

import { galleryCategories, getGalleryAlbum, getGalleryCategory } from '@/data/galleries';
import { siteMetadata } from '@/data/site';
import { listAlbumPhotographs } from '@/lib/b2';

export const alt = 'Photography album preview';
export const contentType = 'image/png';
export const size = { height: 630, width: 1200 };

// Without this the route is server-rendered on demand. The album set is fixed
// at build time, so enumerate it and let every card be prerendered.
export function generateStaticParams() {
  return galleryCategories.flatMap((category) =>
    category.albums
      .filter((album) => album.id !== category.directAlbum)
      .map((album) => ({ albumId: album.id, categoryId: category.id })),
  );
}

/**
 * Per-album share card. Statically generated at build time — it touches no
 * request-time APIs — so it costs nothing at runtime.
 *
 * ImageResponse supports only a subset of CSS (flexbox, solid fills, no
 * shorthand `background`), so keep the composition plain.
 */
export default async function Image({
  params,
}: {
  params: { albumId: string; categoryId: string };
}) {
  const category = getGalleryCategory(params.categoryId);
  const album = getGalleryAlbum(params.categoryId, params.albumId);

  const title = album?.title ?? 'Photography';
  const count = album ? (await listAlbumPhotographs(params.categoryId, params.albumId)).length : 0;
  const meta = [category?.title, album?.year, count ? `${count} photographs` : null]
    .filter(Boolean)
    .join('  ·  ');

  return new ImageResponse(
    <div
      style={{
        backgroundColor: '#101713',
        color: '#f7f2e8',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
        padding: '72px',
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', fontSize: 30, letterSpacing: '0.18em', opacity: 0.75 }}>
        {siteMetadata.name.toUpperCase()}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', fontSize: 88, fontWeight: 700, lineHeight: 1.05 }}>
          {title}
        </div>
        <div style={{ display: 'flex', fontSize: 34, opacity: 0.8 }}>{meta}</div>
      </div>
      <div style={{ display: 'flex', fontSize: 28, opacity: 0.6 }}>
        {siteMetadata.url.replace('https://', '')}
      </div>
    </div>,
    size,
  );
}
