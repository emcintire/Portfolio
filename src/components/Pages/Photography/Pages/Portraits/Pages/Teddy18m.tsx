import { useEffect } from 'react';
import { BackArrow } from '../../../../../Buttons/BackArrow.tsx';
import { map } from 'lodash';

const images = [
  { alt: 'Parents holding toddler', src: 'https://i.imgur.com/GTHUQ2Fh.jpg' },
  { alt: 'Parents kissing toddler', src: 'https://i.imgur.com/ESr2U1ah.jpg' },
  { alt: 'Parents holding toddler', src: 'https://i.imgur.com/i4jE9J7h.jpg' },
  { alt: 'Parents holding toddler', src: 'https://i.imgur.com/4yFh3k5h.jpg' },
  { alt: 'Parents swinging toddler', src: 'https://i.imgur.com/yIqSl6jh.jpg' },
  { alt: "Parents holding toddler's hands", src: 'https://i.imgur.com/UguPUrsh.jpg' },
  { alt: 'Toddler exploring', src: 'https://i.imgur.com/bp2fv6gh.jpg' },
  { alt: 'Dad holding toddler', src: 'https://i.imgur.com/dk7Qpuwh.jpg' },
  { alt: "Toddler on dad's shoudlers", src: 'https://i.imgur.com/A5wttfCh.jpg' },
  { alt: 'Mom holding toddler', src: 'https://i.imgur.com/4nk6Kwuh.jpg' },
  { alt: 'Mom holding toddler', src: 'https://i.imgur.com/dgioYpBh.jpg' },
  { alt: 'Mom kissing toddler', src: 'https://i.imgur.com/0MjuuS9h.jpg' },
  { alt: "Mom holding toddler's hand", src: 'https://i.imgur.com/zx60u6Dh.jpg' },
  { alt: "Mom holding toddler's hand", src: 'https://i.imgur.com/EycFMjah.jpg' },
  { alt: "Mom holding toddler's hand", src: 'https://i.imgur.com/TewWcFUh.jpg' },
  { alt: 'Dad holding toddler', src: 'https://i.imgur.com/YEM55fYh.jpg' },
  { alt: 'Dad holding toddler', src: 'https://i.imgur.com/HPHcxGph.jpg' },
  { alt: "Dad holding toddler's hand", src: 'https://i.imgur.com/1UZSRWah.jpg' },
  { alt: 'Toddler smiling', src: 'https://i.imgur.com/nUUXwmZh.jpg' },
  { alt: 'Toddler smiling', src: 'https://i.imgur.com/2SsjSGoh.jpg' },
  { alt: 'Toddler smiling', src: 'https://i.imgur.com/ycm6Rtnh.jpg' },
  { alt: 'Toddler smiling', src: 'https://i.imgur.com/3GAF8alh.jpg' },
  { alt: 'Toddler with teddy bear', src: 'https://i.imgur.com/YXiTtWLh.jpg' },
  { alt: 'Toddler sitting in tree', src: 'https://i.imgur.com/WfzTOvch.jpg' },
  { alt: 'Dad following toddler', src: 'https://i.imgur.com/DoaF4Zjh.jpg' },
  { alt: 'Toddler smiling', src: 'https://i.imgur.com/qp91LySh.jpg' },
  { alt: 'Dad holding toddler', src: 'https://i.imgur.com/HSC2Uh3h.jpg' },
  { alt: 'Parents holding toddler', src: 'https://i.imgur.com/d0oBQE2h.jpg' },
  { alt: 'Mom holding toddler', src: 'https://i.imgur.com/uxtQa62h.jpg' },
  { alt: 'Parents with toddler', src: 'https://i.imgur.com/z93M7eMh.jpg' },
  { alt: 'Toddler squeezing through parents legs', src: 'https://i.imgur.com/rYvGb5dh.jpg' },
  { alt: 'Parents with toddler', src: 'https://i.imgur.com/vCTbcmeh.jpg' },
  { alt: 'Toddler with stick', src: 'https://i.imgur.com/V6LhEmvh.jpg' },
  { alt: 'Parents looking at toddler', src: 'https://i.imgur.com/Y6yb5nSh.jpg' },
  { alt: 'Parents behind toddler', src: 'https://i.imgur.com/S5FWDxeh.jpg' },
  { alt: 'Toddler smiling', src: 'https://i.imgur.com/YVYmdMQh.jpg' },
  { alt: 'Mom holding toddler by tree', src: 'https://i.imgur.com/3urz12Uh.jpg' },
  { alt: 'Mom holding toddler', src: 'https://i.imgur.com/9gB4hlXh.jpg' },
  { alt: 'Mom holding toddler', src: 'https://i.imgur.com/XX6iuGWh.jpg' },
  { alt: 'Mom holding toddler', src: 'https://i.imgur.com/qW5bCoYh.jpg' },
  { alt: 'Mom kissing toddler', src: 'https://i.imgur.com/k6Yk4mmh.jpg' },
];

export function Teddy18m() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div id='portraits-container'>
        <BackArrow />
        <h1 className='photos-header'>Teddy 18 months</h1>
        <section id='photos'>
          {map(images, (image) => (
            <img key={image.src} src={image.src} alt={image.alt} />
          ))}
        </section>
      </div>
    </>
  );
}
