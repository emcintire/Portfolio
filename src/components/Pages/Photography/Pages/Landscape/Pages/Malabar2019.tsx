import { map } from 'lodash';
import { BackArrow } from '../../../../../Buttons/BackArrow.tsx';

const images = [
  { alt: 'Rock formation', src: 'https://i.imgur.com/i6v6J0wh.jpg' },
  { alt: 'The pacific ocean skyline', src: 'https://i.imgur.com/3QzBHOWh.jpg' },
  { alt: 'Sand stone formation', src: 'https://i.imgur.com/lilY8oBh.jpg' },
  { alt: 'Rocky beach cliff', src: 'https://i.imgur.com/HpuCSHoh.jpg' },
  { alt: 'Rock with a lot of holes', src: 'https://i.imgur.com/GV528pkh.jpg' },
  { alt: 'Rock cliff', src: 'https://i.imgur.com/fDnaiDhh.jpg' },
  { alt: 'Rock cliff', src: 'https://i.imgur.com/zQ6fMGRh.jpg' },
  { alt: 'Skull graffiti', src: 'https://i.imgur.com/9D9dFFSh.jpg' },
  { alt: 'Waves crashing on rock cliff', src: 'https://i.imgur.com/XUh1o8Jh.jpg' },
  { alt: 'Rocky beach cliff', src: 'https://i.imgur.com/4PYNliTh.jpg' },
  { alt: 'Rocky formation', src: 'https://i.imgur.com/zhe5l5vh.jpg' },
];

export function Malabar2019() {
  return (
    <>
      <div id='landscape-container'>
        <BackArrow />
        <h1 className='photos-header'>Malabar</h1>
        <section id='photos'>
          {map(images, (image) => (
            <img key={image.src} src={image.src} alt={image.alt} />
          ))}
        </section>
      </div>
    </>
  );
}
