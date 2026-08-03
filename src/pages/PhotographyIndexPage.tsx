import { Link } from 'react-router-dom';

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
                <Link className="gallery-card" to={`/photography/${category.id}`}>
                  <img
                    alt=""
                    decoding="async"
                    height={category.cardCoverHeight}
                    loading="lazy"
                    sizes="(max-width: 576px) 100vw, 50vw"
                    src={category.cardCover}
                    srcSet={`${category.cardCoverSmall} 800w, ${category.cardCover} 1600w`}
                    width="1600"
                  />
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
