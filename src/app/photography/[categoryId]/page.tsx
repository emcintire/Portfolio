import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { GalleryView } from '@/components/GalleryView';
import { galleryCategories, getGalleryCategory } from '@/data/galleries';

type CategoryParams = { categoryId: string };

// Every category is known at build time, so prerender them all and let anything
// else 404 with a real status instead of rendering not-found content behind 200.
export const dynamicParams = false;

export function generateStaticParams(): CategoryParams[] {
  return galleryCategories.map((category) => ({ categoryId: category.id }));
}

export default async function PhotographyCategoryPage({
  params,
}: {
  params: Promise<CategoryParams>;
}) {
  const { categoryId } = await params;
  const category = getGalleryCategory(categoryId);

  if (!category) notFound();

  // Single-album categories (animals, misc) show the gallery itself rather than
  // an album grid of one. The nested album URL 301s here (see next.config.ts).
  if (category.directAlbum) {
    const directAlbum = category.albums.find((album) => album.id === category.directAlbum);
    if (!directAlbum) notFound();
    return <GalleryView album={directAlbum} category={category} />;
  }

  return (
    <>
      <section className="category-hero">
        {/* LCP element: a 4898px-wide source that used to ship unresized. */}
        <Image alt="" priority sizes="100vw" src={category.cover} />
        <div className="category-hero__overlay">
          <div className="page-container">
            <nav aria-label="Breadcrumb" className="breadcrumb breadcrumb--light">
              <Link href="/photography">Photography</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{category.title}</span>
            </nav>
            <p className="eyebrow">Collection</p>
            <h1>{category.title}</h1>
            <p>{category.description}</p>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="page-container">
          <ul className="album-grid">
            {category.albums.map((album) => (
              <li key={album.id}>
                <Link className="album-card" href={`/photography/${category.id}/${album.id}`}>
                  <Image
                    alt=""
                    sizes="(max-width: 576px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    src={album.cover}
                  />
                  <span>
                    <strong>{album.title}</strong>
                    <span>
                      {album.year} · {album.photographs.length} photographs
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
