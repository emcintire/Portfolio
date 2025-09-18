import { map } from 'lodash';
import { BackArrow } from '../../../../../Buttons/BackArrow.tsx';

const images = [
  { alt: 'Field with mountain peak in back', src: 'https://i.imgur.com/yol64gjh.jpg' },
  { alt: 'Field with mountain peak in back', src: 'https://i.imgur.com/oIGn8poh.jpg' },
  { alt: 'Field with mountain peak in back', src: 'https://i.imgur.com/4MBP1gXh.jpg' },
  { alt: 'Field with mountain peak in back', src: 'https://i.imgur.com/TGBBJlQh.jpg' },
  { alt: 'Mountain peak', src: 'https://i.imgur.com/yWWw9g0h.jpg' },
  { alt: 'Mountain peak', src: 'https://i.imgur.com/ZAtohHeh.jpg' },
  { alt: 'Mountain peak', src: 'https://i.imgur.com/sqG9mCVh.jpg' },
  { alt: 'Mountain peak', src: 'https://i.imgur.com/HscGAFyh.jpg' },
  { alt: 'Mountain peak', src: 'https://i.imgur.com/rtKswirh.jpg' },
  { alt: 'Purple flowers with mountain in back', src: 'https://i.imgur.com/Owywbv3h.jpg' },
  { alt: 'Purple flowers with mountain in back', src: 'https://i.imgur.com/lQfftxah.jpg' },
  { alt: 'Purple flowers with mountain in back', src: 'https://i.imgur.com/RNTieYrh.jpg' },
  { alt: 'Mountain peal through windshield', src: 'https://i.imgur.com/8CbhdQjh.jpg' },
  { alt: 'Sunset on mountain ridge', src: 'https://i.imgur.com/uJdzzpih.jpg' },
  { alt: 'Sunset on water tank', src: 'https://i.imgur.com/6sQFLNHh.jpg' },
  { alt: 'Valley with mountains in back', src: 'https://i.imgur.com/i4aCXmKh.jpg' },
  { alt: 'Sunset over anchorage', src: 'https://i.imgur.com/VRkV04Oh.jpg' },
  { alt: 'Flower field in front of mountain', src: 'https://i.imgur.com/0UWgIi3h.jpg' },
];

export function Alaska2018() {
  return (
    <>
      <div id='landscape-container'>
        <BackArrow />
        <h1 className='photos-header'>Alaska 2018</h1>
        <section id='photos'>
          {map(images, (image) => (
            <img key={image.src} src={image.src} alt={image.alt} />
          ))}
        </section>
      </div>
    </>
  );
}
