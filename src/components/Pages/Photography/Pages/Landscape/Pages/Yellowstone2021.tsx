import { map } from 'lodash';
import { BackArrow } from '../../../../../Buttons/BackArrow.tsx';

const images = [
  { alt: '', src: 'https://imgur.com/gK7Se9vh.jpg' },
  { alt: '', src: 'https://imgur.com/AvfHwJyh.jpg' },
  { alt: '', src: 'https://imgur.com/hQW8EDxh.jpg' },
  { alt: '', src: 'https://imgur.com/RIZdcvUh.jpg' },
  { alt: '', src: 'https://imgur.com/4kfQYDKh.jpg' },
  { alt: '', src: 'https://imgur.com/hPs33zZh.jpg' },
  { alt: '', src: 'https://imgur.com/pyXZg9Xh.jpg' },
  { alt: '', src: 'https://imgur.com/rdp3efXh.jpg' },
  { alt: '', src: 'https://imgur.com/zOFxlV3h.jpg' },
  { alt: '', src: 'https://imgur.com/PaZKAozh.jpg' },
  { alt: '', src: 'https://imgur.com/cQAUuDNh.jpg' },
  { alt: '', src: 'https://imgur.com/Gsf3piFh.jpg' },
  { alt: '', src: 'https://imgur.com/3NV7SR2h.jpg' },
  { alt: '', src: 'https://imgur.com/Htb3010h.jpg' },
  { alt: '', src: 'https://imgur.com/uNUojCIh.jpg' },
  { alt: '', src: 'https://imgur.com/95LzaXwh.jpg' },
  { alt: '', src: 'https://imgur.com/3vrtpDAh.jpg' },
  { alt: '', src: 'https://imgur.com/jI3j8GOh.jpg' },
  { alt: '', src: 'https://imgur.com/bP3qnP0h.jpg' },
  { alt: '', src: 'https://imgur.com/e7OfvEnh.jpg' },
  { alt: '', src: 'https://imgur.com/CgKJbZth.jpg' },
  { alt: '', src: 'https://imgur.com/bN1I5aqh.jpg' },
  { alt: '', src: 'https://imgur.com/ND1CC9hh.jpg' },
  { alt: '', src: 'https://imgur.com/D8piZcCh.jpg' },
  { alt: '', src: 'https://imgur.com/e1jm51Gh.jpg' },
  { alt: '', src: 'https://imgur.com/lEpSqiSh.jpg' },
  { alt: '', src: 'https://imgur.com/kP0LMMfh.jpg' },
  { alt: '', src: 'https://imgur.com/FWucYsNh.jpg' },
  { alt: '', src: 'https://imgur.com/M45Wnq3h.jpg' },
  { alt: '', src: 'https://imgur.com/ooWzqhOh.jpg' },
  { alt: '', src: 'https://imgur.com/Wb6KL6wh.jpg' },
  { alt: '', src: 'https://imgur.com/bap5nych.jpg' },
  { alt: '', src: 'https://imgur.com/pbbVLETh.jpg' },
  { alt: '', src: 'https://imgur.com/lM09uBGh.jpg' },
  { alt: '', src: 'https://imgur.com/6oOMd9Oh.jpg' },
  { alt: '', src: '' },
];

export function Yellowstone2021() {
  return (
    <>
      <div id='landscape-container'>
        <BackArrow />
        <h1 className='photos-header'>Yellowstone</h1>
        <section id='photos'>
          {map(images, (image) => (
            <img key={image.src} src={image.src} alt={image.alt} />
          ))}
        </section>
      </div>
    </>
  );
}
