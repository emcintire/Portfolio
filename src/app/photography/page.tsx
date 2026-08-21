import Image from 'next/image';
import Link from 'next/link';

import { galleryCategories } from '@/data/galleries';
import { siteMetadata } from '@/data/site';
import { JsonLd } from '@/lib/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

const albumCount = galleryCategories.reduce((total, category) => total + category.albums.length, 0);

export const metadata = buildMetadata({
  description: `Landscape, portrait, and wildlife photography by ${siteMetadata.name} — ${albumCount} albums spanning national parks, road trips, and family sessions.`,
  path: '/photography',
  title: 'Photography',
});

export default function PhotographyIndexPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Photography', path: '/photography' }])} />
      <section className="page-hero photography-hero">
        <div className="page-container page-hero__grid">
          <div>
            <p className="eyebrow">Photography</p>
            <h1>
              I came here to chew bubble gum and take pictures... and I&apos;m all out of bubble
              gum.
            </h1>
          </div>
          <div className="page-hero__copy">
            <p>
              A personal archive of landscapes, portraits, wildlife, and anything that tickled my
              fancy.
            </p>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="page-container">
          <ul className="gallery-card-grid gallery-card-grid--large">
            {galleryCategories.map((category) => (
              <li key={category.id}>
                <Link className="gallery-card" href={`/photography/${category.id}`}>
                  <Image alt="" sizes="(max-width: 576px) 100vw, 50vw" src={category.cardCover} />
                  <span className="gallery-card__overlay">
                    <strong>{category.title}</strong>
                    <span>{category.description}</span>
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
