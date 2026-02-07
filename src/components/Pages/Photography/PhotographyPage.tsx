import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import type { Photograph } from '../../../types';
import { photographs } from '@/data/photos';

export function PhotographyPage() {
  const { album } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [album]);

  const images = useMemo<Array<Photograph>>(
    () => photographs[(album ?? '').toLowerCase()] ?? [],
    [album],
  );

  return (
    <div className='photo-container'>
      <section className='photos'>
        {images.map((image) => (
          <img key={image.src} src={image.src} alt={image.alt} />
        ))}
      </section>
    </div>
  );
}
