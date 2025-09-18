import { useEffect } from 'react';
import { BackArrow } from '../../../../../Buttons/BackArrow.tsx';
import { map } from 'lodash';

const images = [
  { alt: 'Mom holding baby', src: 'https://i.imgur.com/IdjwIUfh.jpg' },
  { alt: 'Mom holding up baby', src: 'https://i.imgur.com/RCyLK6mh.jpg' },
  { alt: 'Parents holding toddler', src: 'https://i.imgur.com/EuJinXYh.jpg' },
  { alt: 'Baby standing in front of tent', src: 'https://i.imgur.com/WXDMAtYh.jpg' },
  { alt: 'Mom kissing baby', src: 'https://i.imgur.com/kX37vYkh.jpg' },
  { alt: 'Mom kissing baby', src: 'https://i.imgur.com/hOWB0MPh.jpg' },
  { alt: 'Mom holding up baby', src: 'https://i.imgur.com/zGivwcNh.jpg' },
  { alt: 'Mom holding baby upside down', src: 'https://i.imgur.com/WlYNlRxh.jpg' },
  { alt: 'Baby sitting in tent', src: 'https://i.imgur.com/s0H7d46h.jpg' },
  { alt: 'Baby sitting in tent', src: 'https://i.imgur.com/SXA1vj6h.jpg' },
  { alt: 'Mom holding baby by tree', src: 'https://i.imgur.com/cb660jwh.jpg' },
  { alt: 'Mom looking at baby', src: 'https://i.imgur.com/WMMnvkmh.jpg' },
  { alt: 'Baby in yellow raincoat', src: 'https://i.imgur.com/fNHGVPDh.jpg' },
  { alt: 'Baby in yellow raincoat', src: 'https://i.imgur.com/qLoKXCTh.jpg' },
  { alt: 'Baby in yellow raincoat', src: 'https://i.imgur.com/QtFKVnth.jpg' },
  { alt: 'Baby in yellow raincoat', src: 'https://i.imgur.com/CLnUmnuh.jpg' },
  { alt: 'Mom looking at baby', src: 'https://i.imgur.com/rFGTCn5h.jpg' },
  { alt: 'Baby in yellow raincoat', src: 'https://i.imgur.com/Gf9PV8Fh.jpgg' },
  { alt: 'Mom holding baby in hat', src: 'https://i.imgur.com/QZeSTdZh.jpg' },
  { alt: 'Mom kissing baby in hat', src: 'https://i.imgur.com/GaeRBY8h.jpg' },
  { alt: 'Mom holding baby in hat', src: 'https://i.imgur.com/cHKzPIjh.jpg' },
  { alt: 'Baby standing on grass', src: 'https://i.imgur.com/XEFEtjSh.jpg' },
  { alt: 'Baby standing on grass', src: 'https://i.imgur.com/qDVRvdvh.jpg' },
  { alt: 'Mom holding baby', src: 'https://i.imgur.com/GcjM1wRh.jpg' },
  { alt: 'Baby standing on grass', src: 'https://i.imgur.com/qgkD30Bh.jpg' },
  { alt: 'Baby in pajamas', src: 'https://i.imgur.com/uMR1nf8h.jpg' },
  { alt: 'Mom holding two babies', src: 'https://i.imgur.com/niaFfpGh.jpg' },
];

export function Teddy12m() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div id='portraits-container'>
        <BackArrow />
        <h1 className='photos-header'>Teddy 12 months</h1>
        <section id='photos'>
          {map(images, (image) => (
            <img key={image.src} src={image.src} alt={image.alt} />
          ))}
        </section>
      </div>
    </>
  );
}
