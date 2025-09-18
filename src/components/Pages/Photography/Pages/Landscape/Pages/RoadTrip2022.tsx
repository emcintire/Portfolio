import { map } from 'lodash';
import { BackArrow } from '../../../../../Buttons/BackArrow.tsx';

const images = [
  { src: 'https://i.imgur.com/XcN5CEVh.jpg', alt: 'Cloudy golden gate bridge' },
  { src: 'https://i.imgur.com/uCnnyoXh.jpg', alt: 'Golden gate bridge' },
  { src: 'https://i.imgur.com/0XMHXlVh.jpg', alt: 'Welcome to oregon sign' },
  { src: 'https://i.imgur.com/C5F5r4uh.jpg', alt: 'No skateboarding sign' },
  { src: 'https://i.imgur.com/seXglrPh.jpg', alt: 'Mount Rushmore' },
  { src: 'https://i.imgur.com/wQ8OpUWh.jpg', alt: 'Smoke filled woods' },
  { src: 'https://i.imgur.com/RTG597Lh.jpg', alt: 'Tree with smoke behind' },
];

export function Roadtrip2022() {
  return (
    <>
      <div id='landscape-container'>
        <BackArrow />
        <h1 className='photos-header'>Roadtrip 2022</h1>
        <section id='photos'>
          {map(images, (image) => (
            <img key={image.src} src={image.src} alt={image.alt} />
          ))}
        </section>
      </div>
    </>
  );
}
