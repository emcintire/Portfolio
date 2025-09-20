import { get, map, toLower } from 'lodash';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { photographs } from './photographs';
import type { Photograph } from '../../../types';

export function PhotographyPage() {
  const { album } = useParams();

  const images = useMemo<Array<Photograph>>(
    () => get(photographs, toLower(album), []),
    [album],
  );

  return (
    <div id='photo-container'>
      <section id='photos'>
        {map(images, (image) => (
          <img key={image.src} src={image.src} alt={image.alt} />
        ))}
      </section>
    </div>
  );
}
