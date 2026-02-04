import { get, map, toLower } from 'lodash';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import type { Photograph } from '../../../types';
import { photographs } from '../../../data/photos';

export function PhotographyPage() {
  const { album } = useParams();

  const images = useMemo<Array<Photograph>>(
    () => get(photographs, toLower(album), []),
    [album],
  );

  return (
    <div className='photo-container'>
      <section className='photos'>
        {map(images, (image) => (
          <img key={image.src} src={image.src} alt={image.alt} />
        ))}
      </section>
    </div>
  );
}
