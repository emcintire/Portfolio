import { useEffect } from 'react';
import { BackArrow } from '../../../../../Buttons/BackArrow.tsx';
import { map } from 'lodash';

const images = [
  { alt: 'Infant smiling', src: 'https://i.imgur.com/REfswYeh.jpg' },
  { alt: 'Toddler holding baby cousin', src: 'https://i.imgur.com/h4rSEp3h.jpg' },
  { alt: 'Mom kissing infant', src: 'https://i.imgur.com/MfqIXd0h.jpg' },
  { alt: 'Mom kissing infant', src: 'https://i.imgur.com/nnBsIuFh.jpg' },
  { alt: 'Mom holding infant', src: 'https://i.imgur.com/nALH0eBh.jpg' },
  { alt: 'Mom holding infant', src: 'https://i.imgur.com/JDCHePTh.jpg' },
  { alt: 'Mom holding toddler and infant', src: 'https://i.imgur.com/fqh3oAqh.jpg' },
  { alt: 'Mom holding toddler and infant', src: 'https://i.imgur.com/PtPI4XEh.jpg' },
  { alt: 'Mom holding toddler and infant', src: 'https://i.imgur.com/sTjyA4Qh.jpg' },
  { alt: 'Mom kissing infant', src: 'https://i.imgur.com/K08MdmVh.jpg' },
  { alt: 'Mom holding infant', src: 'https://i.imgur.com/cZQXjh8h.jpg' },
  { alt: 'Mom holding infant', src: 'https://i.imgur.com/ey8qrgkh.jpg' },
];

export function Rio8m() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div id='portraits-container'>
        <BackArrow />
        <h1 className='photos-header'>Rio 8 months</h1>
        <section id='photos'>
          {map(images, (image) => (
            <img key={image.src} src={image.src} alt={image.alt} />
          ))}
        </section>
      </div>
    </>
  );
}
