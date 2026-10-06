import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { GalleryView } from '@/components/GalleryView';
import { SplitWords } from '@/components/SplitWords';
import { galleryCategories, getGalleryCategory } from '@/data/galleries';
import { siteMetadata } from '@/data/site';
import { listAlbumCounts, listAlbumPhotographs } from '@/lib/b2';
import { JsonLd } from '@/lib/JsonLd';
import { breadcrumbSchema, collectionPageSchema, imageGallerySchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

type CategoryParams = { categoryId: string };

export const dynamicParams = false;

export function generateStaticParams(): CategoryParams[] {
  return galleryCategories.map((category) => ({ categoryId: category.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<CategoryParams>;
}): Promise<Metadata> {
  const { categoryId } = await params;
  const category = getGalleryCategory(categoryId);
  if (!category) return {};

  const counts = await listAlbumCounts(
    category.id,
    category.albums.map((entry) => entry.id),
  );
  const photographs = Object.values(counts).reduce((total, n) => total + n, 0);
  const scope = category.directAlbum
    ? `${photographs} photographs`
    : `${photographs} photographs across ${category.albums.length} albums`;

  return buildMetadata({
    description: `${category.description} ${scope}, photographed by ${siteMetadata.name}.`,
    path: `/photography/${category.id}`,
    title: `${category.title} Photography`,
  });
}

export default async function PhotographyCategoryPage({
  params,
}: {
  params: Promise<CategoryParams>;
}) {
  const { categoryId } = await params;
  const category = getGalleryCategory(categoryId);

  if (!category) notFound();

  const breadcrumb = breadcrumbSchema([
    { name: 'Photography', path: '/photography' },
    { name: category.title, path: `/photography/${category.id}` },
  ]);

  if (category.directAlbum) {
    const directAlbum = category.albums.find((album) => album.id === category.directAlbum);
    if (!directAlbum) notFound();

    const sources = await listAlbumPhotographs(category.id, directAlbum.id);
    const photographs = sources.map((source, index) => ({
      ...source,
      alt: `${directAlbum.title} photograph ${index + 1}`,
    }));

    return (
      <>
        <JsonLd
          data={imageGallerySchema(
            directAlbum,
            category,
            `/photography/${category.id}`,
            photographs,
          )}
        />
        <JsonLd data={breadcrumb} />
        <GalleryView album={directAlbum} category={category} photographs={photographs} />
      </>
    );
  }

  const counts = await listAlbumCounts(
    category.id,
    category.albums.map((entry) => entry.id),
  );

  return (
    <>
      <JsonLd data={collectionPageSchema(category)} />
      <JsonLd data={breadcrumb} />
      <section className="category-hero">
        <Image alt="" priority sizes="100vw" src={category.cover} />
        <div className="category-hero__overlay">
          <div className="page-container">
            <nav aria-label="Breadcrumb" className="breadcrumb breadcrumb--light">
              <Link href="/photography">Photography</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{category.title}</span>
            </nav>
            <p className="eyebrow">Collection</p>
            <h1>
              <SplitWords text={category.title} />
            </h1>
            <p>{category.description}</p>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="page-container">
          <ul className="album-grid">
            {category.albums.map((album) => (
              <li data-reveal="" key={album.id}>
                <Link
                  className="album-card"
                  data-cursor-label="Open"
                  href={`/photography/${category.id}/${album.id}`}
                >
                  <Image
                    alt=""
                    sizes="(max-width: 576px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    src={album.cover}
                  />
                  <span>
                    <strong>{album.title}</strong>
                    <span>
                      {album.year} · {counts[album.id] ?? 0} photographs
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
