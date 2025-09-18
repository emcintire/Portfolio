import { map } from 'lodash';
import { BackArrow } from '../../../../../Buttons/BackArrow.tsx';

const images = [
  { src: 'https://imgur.com/iTVZnoZh.jpg' },
  { src: 'https://imgur.com/oKa75pHh.jpg' },
  { src: 'https://imgur.com/v8DzS1Eh.jpg' },
  { src: 'https://imgur.com/BjkpdYph.jpg' },
  { src: 'https://imgur.com/QmL9PmXh.jpg' },
  { src: 'https://imgur.com/jwFscAAh.jpg' },
  { src: 'https://imgur.com/vFTdYMlh.jpg' },
  { src: 'https://imgur.com/gmWBSAoh.jpg' },
  { src: 'https://imgur.com/chtgUzBh.jpg' },
  { src: 'https://imgur.com/UXNmgMNh.jpg' },
  { src: 'https://imgur.com/tgUbs9th.jpg' },
  { src: 'https://imgur.com/vV9CwGYh.jpg' },
  { src: 'https://imgur.com/FfDcmFih.jpg' },
  { src: 'https://imgur.com/Nc0ui2ch.jpg' },
  { src: 'https://imgur.com/hgJC2D2h.jpg' },
  { src: 'https://imgur.com/nbmtSRFh.jpg' },
  { src: 'https://imgur.com/XUukZkth.jpg' },
  { src: 'https://imgur.com/in1F593h.jpg' },
]

export function Alaska2020() {
  return (
    <>
      <div id='landscape-container'>
        <BackArrow />
        <h1 className='photos-header'>Alaska 2020</h1>
        <section id='photos'>
          {map(images, (image) => (
            <img key={image.src} src={image.src} alt='' />
          ))}
        </section>
      </div>
    </>
  );
}
