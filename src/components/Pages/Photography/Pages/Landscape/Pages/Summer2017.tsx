import { map } from 'lodash';
import { BackArrow } from '../../../../../Buttons/BackArrow.tsx';

const images = [
  { alt: 'Grand Canyon welcome sign', src: 'https://i.imgur.com/2nvi3DRh.jpg' },
  { alt: 'River with cliff in background', src: 'https://i.imgur.com/G5vpNWPh.jpg' },
  { alt: 'Green valley with river running through', src: 'https://i.imgur.com/mAUFQpMh.jpg' },
  { alt: 'Green valley with river running through', src: 'https://i.imgur.com/MOWhyNRh.jpg' },
  { alt: 'Trail on cliff', src: 'https://i.imgur.com/7pvL108h.jpg' },
  { alt: 'Narrow canyon', src: 'https://i.imgur.com/ufycp4Wh.jpg' },
  { alt: 'Grand canyon through tree branches', src: 'https://i.imgur.com/cPQI4ith.jpg' },
  { alt: 'Sunset over cliff', src: 'https://i.imgur.com/6cQpC4Ph.jpg' },
  { alt: 'Zion National Park welcome sign', src: 'https://i.imgur.com/xjBY8fPh.jpg' },
  { alt: 'Zion National Park welcome sign', src: 'https://i.imgur.com/6IGnobLh.jpg' },
  { alt: 'Windy road with rocks behind', src: 'https://i.imgur.com/X4Llw61h.jpg' },
  { alt: 'Valley with river running through', src: 'https://i.imgur.com/gDgFEnNh.jpg' },
  { alt: 'Trail through forest', src: 'https://i.imgur.com/z4lsdnxh.jpg' },
  { alt: 'Trail with mountain in back', src: 'https://i.imgur.com/EH4lv5Ah.jpg' },
  { alt: 'Sun setting on lone mountain peak', src: 'https://i.imgur.com/VB2jFLlh.jpg' },
  { alt: 'Intricate cobweb', src: 'https://i.imgur.com/yjeIJxbh.jpg' },
  { alt: 'Sign on bridge over cliff', src: 'https://i.imgur.com/Yzq3JE1h.jpg' },
  { alt: 'Tree branch with mountain in back', src: 'https://i.imgur.com/oGR1ncFh.jpg' },
  { alt: 'Tree branch with mountain in back', src: 'https://i.imgur.com/dbHVfrth.jpg' },
  { alt: 'Deer in forest', src: 'https://i.imgur.com/6Vc7A9lh.jpg' },
];

export function Summer2017() {
  return (
    <>
      <div id='landscape-container'>
        <BackArrow />
        <h1 className='photos-header'>Summer 2017</h1>
        <section id='photos'>
          {map(images, (image) => (
            <img key={image.src} src={image.src} alt={image.alt} />
          ))}
        </section>
      </div>
    </>
  );
}
