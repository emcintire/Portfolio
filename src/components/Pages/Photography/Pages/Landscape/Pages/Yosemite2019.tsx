import { map } from 'lodash';
import { BackArrow } from '../../../../../Buttons/BackArrow.tsx';

const images = [
  { alt: 'Taft point in yosemite', src: 'https://i.imgur.com/Cywm5adh.jpg' },
  { alt: 'Taft point in yosemite', src: 'https://i.imgur.com/t2Vs2qeh.jpg' },
  { alt: 'Taft point in yosemite', src: 'https://i.imgur.com/ms9FOjuh.jpg' },
  { alt: 'Taft point in yosemite', src: 'https://i.imgur.com/ATdT872h.jpg' },
  { alt: 'Taft point in yosemite', src: 'https://i.imgur.com/VfOvzxJh.jpg' },
  { alt: 'El Capitan in yosemite', src: 'https://i.imgur.com/LoN2gGHh.jpg' },
  { alt: 'El Capitan in yosemite', src: 'https://i.imgur.com/4PuAD8eh.jpg' },
  { alt: 'Taft point sign', src: 'https://i.imgur.com/0LWmDqCh.jpg' },
  { alt: 'El capitan', src: 'https://i.imgur.com/Jo7rB7hh.jpg' },
  { alt: 'Big Waterfall', src: 'https://i.imgur.com/O9DYB36h.jpg' },
  { alt: 'Fissure in a cliff', src: 'https://i.imgur.com/kiQ3CC8h.jpg' },
  { alt: 'Fallen tree in woods', src: 'https://i.imgur.com/hfbu7Ahh.jpg' },
  { alt: 'Yosemite valley', src: 'https://i.imgur.com/z5nZFAdh.jpg' },
  { alt: 'Big Waterfall', src: 'https://i.imgur.com/mVwGTVZh.jpg' },
  { alt: 'Sun shining through trees', src: 'https://i.imgur.com/KHii5Ufh.jpg' },
  { alt: 'Yosemite valley', src: 'https://i.imgur.com/ei1x4Zkh.jpg' },
  { alt: 'Redwood trees', src: 'https://i.imgur.com/FBKUdBgh.jpg' },
  { alt: 'Yosemite valley', src: 'https://i.imgur.com/ei1x4Zkh.jpg' },
  { alt: 'Waterfall in yosemite valley', src: 'https://i.imgur.com/MY0QOQXh.jpg' },
  { alt: 'Yosemite valley', src: 'https://i.imgur.com/S2IlYBbh.jpg' },
];

export function Yosemite2019() {
  return (
    <>
      <div id='landscape-container'>
        <BackArrow />
        <h1 className='photos-header'>Yosemite</h1>
        <section id='photos'>
          {map(images, (image) => (
            <img key={image.src} src={image.src} alt={image.alt} />
          ))}
        </section>
      </div>
    </>
  );
}
