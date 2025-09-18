import { useEffect } from 'react';
import { BackArrow } from '../../../../../Buttons/BackArrow.tsx';
import { map } from 'lodash';

const images = [
  { alt: '', src: 'https://imgur.com/GwO88UWh.jpg' },
  { alt: '', src: 'https://imgur.com/OrSUnSwh.jpg' },
  { alt: '', src: 'https://imgur.com/gcq0X4Dh.jpg' },
  { alt: '', src: 'https://imgur.com/iGoafgnh.jpg' },
  { alt: '', src: 'https://imgur.com/L8953DFh.jpg' },
  { alt: '', src: 'https://imgur.com/vLZDoeAh.jpg' },
  { alt: '', src: 'https://imgur.com/o6JPTEth.jpg' },
  { alt: '', src: 'https://imgur.com/6t9S7TVh.jpg' },
  { alt: '', src: 'https://imgur.com/lW54vxFh.jpg' },
  { alt: '', src: 'https://imgur.com/vQOem9wh.jpg' },
  { alt: '', src: 'https://imgur.com/5H0pyOSh.jpg' },
  { alt: '', src: 'https://imgur.com/LP1BIwSh.jpg' },
  { alt: '', src: 'https://imgur.com/w8DBBPdh.jpg' },
  { alt: '', src: 'https://imgur.com/dsYrxgch.jpg' },
  { alt: '', src: 'https://imgur.com/FTRP2QQh.jpg' },
  { alt: '', src: 'https://imgur.com/GSaW0ash.jpg' },
  { alt: '', src: 'https://imgur.com/MpA1myah.jpg' },
  { alt: '', src: 'https://imgur.com/OZLfZU7h.jpg' },
  { alt: '', src: 'https://imgur.com/Jx4lfNqh.jpg' },
  { alt: '', src: 'https://imgur.com/2SkIM1Vh.jpg' },
  { alt: '', src: 'https://imgur.com/xKO3Z1Lh.jpg' },
  { alt: '', src: 'https://imgur.com/daCkMuUh.jpg' },
  { alt: '', src: 'https://imgur.com/UWtMnRwh.jpg' },
  { alt: '', src: 'https://imgur.com/A1IH2sRh.jpg' },
  { alt: '', src: 'https://imgur.com/r5xRFyqh.jpg' },
  { alt: '', src: 'https://imgur.com/3lqJpKvh.jpg' },
  { alt: '', src: 'https://imgur.com/0N6uDf7h.jpg' },
  { alt: '', src: 'https://imgur.com/5mfP2T9h.jpg' },
  { alt: '', src: 'https://imgur.com/AvYjq1bh.jpg' },
  { alt: '', src: 'https://imgur.com/CbsioSBh.jpg' },
  { alt: '', src: 'https://imgur.com/IfE8zuCh.jpg' },
  { alt: '', src: 'https://imgur.com/r2XQoseh.jpg' },
  { alt: '', src: 'https://imgur.com/any9TxBh.jpg' },
  { alt: '', src: 'https://imgur.com/CY67Mqsh.jpg' },
  { alt: '', src: 'https://imgur.com/UULruq4h.jpg' },
  { alt: '', src: 'https://imgur.com/h0Mn2Elh.jpg' },
  { alt: '', src: 'https://imgur.com/3CzdKeIh.jpg' },
  { alt: '', src: 'https://imgur.com/RJlNtJbh.jpg' },
  { alt: '', src: 'https://imgur.com/JmXJrDSh.jpg' },
  { alt: '', src: 'https://imgur.com/8XG9HJCh.jpg' },
  { alt: '', src: 'https://imgur.com/2DkrRzVh.jpg' },
  { alt: '', src: 'https://imgur.com/kjIqdXCh.jpg' },
  { alt: '', src: 'https://imgur.com/smBRSPch.jpg' },
  { alt: '', src: 'https://imgur.com/UbV4JtXh.jpg' },
  { alt: '', src: 'https://imgur.com/oIG7eYih.jpg' },
  { alt: '', src: 'https://imgur.com/WVQqHoah.jpg' },
  { alt: '', src: 'https://imgur.com/yi6jQhkh.jpg' },
  { alt: '', src: 'https://imgur.com/8GvTL4Ah.jpg' },
  { alt: '', src: 'https://imgur.com/ly2BD3Hh.jpg' },
  { alt: '', src: 'https://imgur.com/kwIhTVTh.jpg' },
  { alt: '', src: 'https://imgur.com/OQuYVezh.jpg' },
  { alt: '', src: 'https://imgur.com/lFz7rmPh.jpg' },
  { alt: '', src: 'https://imgur.com/qcp6H0Ph.jpg' },
  { alt: '', src: 'https://imgur.com/g9rbm0ih.jpg' },
  { alt: '', src: 'https://imgur.com/FsiyEK9h.jpg' },
  { alt: '', src: 'https://imgur.com/yRZyWnqh.jpg' },
  { alt: '', src: 'https://imgur.com/jjtxDlqh.jpg' },
  { alt: '', src: 'https://imgur.com/GWdRwM6h.jpg' },
  { alt: '', src: 'https://imgur.com/Cs2COLHh.jpg' },
];

export function Rio15m() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div id='portraits-container'>
        <BackArrow />
        <h1 className='photos-header'>Rio 15 months</h1>
        <section id='photos'>
          {map(images, (image) => (
            <img key={image.src} src={image.src} alt={image.alt} />
          ))}
        </section>
      </div>
    </>
  );
}
