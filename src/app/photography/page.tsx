import Image from 'next/image';
import Link from 'next/link';

import { galleryCategories } from '@/data/galleries';

export default function PhotographyIndexPage() {
  return (
    <>
      <section className="page-hero photography-hero">
        <div className="page-container page-hero__grid">
          <div>
            <p className="eyebrow">Photography</p>
            <h1>Places, people, and the moments between plans.</h1>
          </div>
          <div className="page-hero__copy">
            <p>
              A personal archive of landscapes, portraits, wildlife, and smaller observations made
              while moving through the world with a camera.
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
