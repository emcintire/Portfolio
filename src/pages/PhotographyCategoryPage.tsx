import { Link, useParams } from 'react-router-dom';

import { GalleryView } from '@/components/GalleryView';
import { getGalleryCategory } from '@/data/galleries';

import NotFoundPage from './NotFoundPage';

export default function PhotographyCategoryPage() {
  const { categoryId } = useParams();
  const category = getGalleryCategory(categoryId);

  if (!category) return <NotFoundPage />;

  if (category.directAlbum) {
    const directAlbum = category.albums.find((album) => album.id === category.directAlbum);
    if (!directAlbum) return <NotFoundPage />;
    return <GalleryView album={directAlbum} category={category} />;
  }

  return (
    <>
      <section className="category-hero">
        <img
          alt=""
          height={category.coverHeight}
          src={category.cover}
          width={category.coverWidth}
        />
        <div className="category-hero__overlay">
          <div className="page-container">
            <nav aria-label="Breadcrumb" className="breadcrumb breadcrumb--light">
              <Link to="/photography">Photography</Link>
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
                <Link className="album-card" to={`/photography/${category.id}/${album.id}`}>
                  <img
                    alt=""
                    decoding="async"
                    height="900"
                    loading="lazy"
                    sizes="(max-width: 576px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    src={album.cover}
                    srcSet={`${album.coverSmall} 800w, ${album.cover} 1600w`}
                    width="1600"
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
