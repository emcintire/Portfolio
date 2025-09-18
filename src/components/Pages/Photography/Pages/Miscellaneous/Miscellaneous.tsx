import './Miscellaneous.css';
import { useEffect } from 'react';
import { BackArrow } from '../../../../Buttons/BackArrow.tsx';
import { map } from 'lodash';

const images = [
  { alt: '', src: 'https://i.imgur.com/yjeIJxbh.jpg' },
  { alt: 'Boston skyline', src: 'https://i.imgur.com/FcaDpuvh.jpg' },
  { alt: 'Band performing', src: 'https://i.imgur.com/zW9U6cHh.jpg' },
  { alt: 'Audience cheering at concert', src: 'https://i.imgur.com/u7vZcPLh.jpg' },
  { alt: 'Old plane in field', src: 'https://i.imgur.com/TTnJL0ih.jpg' },
  { alt: '', src: 'https://imgur.com/UTwAaa2h.jpg' },
  { alt: '', src: 'https://imgur.com/tYSLAdTh.jpg' },
  { alt: '', src: 'https://imgur.com/OTH2KDph.jpg' },
  { alt: '', src: 'https://imgur.com/u4ZUXlGh.jpg' },
]

export function Miscellaneous() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div id='misc-container'>
        <BackArrow />
        <h1 className='photos-header'>Miscellaneous</h1>
        <section id='photos'>
          {map(images, (image) => (
            <img key={image.src} src={image.src} alt={image.alt} />
          ))}
        </section>
      </div>
    </>
  );
}
