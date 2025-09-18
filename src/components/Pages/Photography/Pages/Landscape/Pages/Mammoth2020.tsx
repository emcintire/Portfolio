import { map } from 'lodash';
import { BackArrow } from '../../../../../Buttons/BackArrow.tsx';

const images = [
  { src: 'https://imgur.com/1utq2yqh.jpg' },
  { src: 'https://imgur.com/T7MjBdsh.jpg' },
  { src: 'https://imgur.com/alDWxFVh.jpg' },
  { src: 'https://imgur.com/gIbfArqh.jpg' },
  { src: 'https://imgur.com/L2YfnW6h.jpg' },
  { src: 'https://imgur.com/BwzwTJah.jpg' },
  { src: 'https://imgur.com/AVnzEAHh.jpg' },
  { src: 'https://imgur.com/0CrmUoBh.jpg' },
  { src: 'https://imgur.com/aBBvxrJh.jpg' },
  { src: 'https://imgur.com/rQATyR8h.jpg' },
  { src: 'https://imgur.com/s4abVRKh.jpg' },
  { src: 'https://imgur.com/WeZBTrmh.jpg' },
  { src: 'https://imgur.com/z6bjSavh.jpg' },
  { src: 'https://imgur.com/UQujKmfh.jpg' },
  { src: 'https://imgur.com/hB2PoLXh.jpg' },
  { src: 'https://imgur.com/wGR0feTh.jpg' },
  { src: 'https://imgur.com/kUG6fphh.jpg' },
  { src: 'https://imgur.com/3ATEcZrh.jpg' },
  { src: 'https://imgur.com/OLuZ5uhh.jpg' },
  { src: 'https://imgur.com/kly5MHvh.jpg' },
  { src: 'https://imgur.com/Pjys7TMh.jpg' },
  { src: 'https://imgur.com/uJnV23nh.jpg' },
  { src: 'https://imgur.com/1yp51Pth.jpg' },
  { src: 'https://imgur.com/g7HvCpEh.jpg' },
  { src: 'https://imgur.com/s6tBbE3h.jpg' },
  { src: 'https://imgur.com/rH3Xr3Lh.jpg' },
  { src: 'https://imgur.com/FUowoImh.jpg' },
  { src: 'https://imgur.com/8FYswirh.jpg' },
  { src: 'https://imgur.com/Ey79SR4h.jpg' },
  { src: 'https://imgur.com/OFKoE0gh.jpg' },
  { src: 'https://imgur.com/9oTpx67h.jpg' },
  { src: 'https://imgur.com/aBlqf1bh.jpg' },
  { src: 'https://imgur.com/VAzKPVTh.jpg' },
  { src: 'https://imgur.com/82YBjlhh.jpg' },
  { src: 'https://imgur.com/zk0fPjgh.jpg' },
  { src: 'https://imgur.com/XtxSQ7Lh.jpg' },
];

export function Mammoth2020() {
  return (
    <>
      <div id='landscape-container'>
        <BackArrow />
        <h1 className='photos-header'>Mammoth</h1>
        <section id='photos'>
          {map(images, (image) => (
            <img key={image.src} src={image.src} alt='' />
          ))}
        </section>
      </div>
    </>
  );
}
