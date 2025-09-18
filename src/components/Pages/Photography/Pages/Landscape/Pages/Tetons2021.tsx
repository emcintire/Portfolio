import { map } from 'lodash';
import { BackArrow } from '../../../../../Buttons/BackArrow.tsx';

const images = [
  { alt: '', src:'https://imgur.com/CBNzG0mh.jpg' },
  { alt: '', src:'https://imgur.com/oJalWGRh.jpg' },
  { alt: '', src:'https://imgur.com/NlSFUMvh.jpg' },
  { alt: '', src:'https://imgur.com/yFMF77Dh.jpg' },
  { alt: '', src:'https://imgur.com/A8d5qBeh.jpg' },
  { alt: '', src:'https://imgur.com/kEL4Mcxh.jpg' },
  { alt: '', src:'https://imgur.com/Wk02uxjh.jpg' },
  { alt: '', src:'https://imgur.com/mziP30Eh.jpg' },
  { alt: '', src:'https://imgur.com/CdOPTe2h.jpg' },
  { alt: '', src:'https://imgur.com/nwns525h.jpg' },
  { alt: '', src:'https://imgur.com/QYF3Ntsh.jpg' },
  { alt: '', src:'https://imgur.com/M7vl6CSh.jpg' },
  { alt: '', src:'https://imgur.com/REc3lBjh.jpg' },
  { alt: '', src:'https://imgur.com/5xPT6Rgh.jpg' },
  { alt: '', src:'https://imgur.com/y50ycqEh.jpg' },
  { alt: '', src:'https://imgur.com/jMEa11bh.jpg' },
  { alt: '', src:'https://imgur.com/xsn6amUh.jpg' },
  { alt: '', src:'https://imgur.com/R6i8eYqh.jpg' },
  { alt: '', src:'https://imgur.com/nsKoO8zh.jpg' },
  { alt: '', src:'https://imgur.com/XplkOcNh.jpg' },
  { alt: '', src:'https://imgur.com/gaG7kz4h.jpg' },
  { alt: '', src:'https://imgur.com/LqYj8Pwh.jpg' },
  { alt: '', src:'https://imgur.com/Nsj0dofh.jpg' },
  { alt: '', src:'https://imgur.com/BZLvEsuh.jpg' },
  { alt: '', src:'https://imgur.com/bM9HOOMh.jpg' },
  { alt: '', src:'https://imgur.com/4jLERhjh.jpg' },
  { alt: '', src:'https://imgur.com/w0OX1kYh.jpg' },
  { alt: '', src:'https://imgur.com/ZpmMweah.jpg' },
  { alt: '', src:'https://imgur.com/cnXdkC6h.jpg' },
  { alt: '', src:'https://imgur.com/7G7ZMcih.jpg' },
  { alt: '', src:'https://imgur.com/QeP0Gmqh.jpg' },
  { alt: '', src:'https://imgur.com/JZ3dvfLh.jpg' },
  { alt: '', src:'https://imgur.com/2Vj6i63h.jpg' },
  { alt: '', src:'https://imgur.com/ZOYGVQhh.jpg' },
  { alt: '', src:'https://imgur.com/4uk0NHLh.jpg' },
  { alt: '', src:'https://imgur.com/Hh78of6h.jpg' },
  { alt: '', src:'https://imgur.com/MsNxiNph.jpg' },
  { alt: '', src:'https://imgur.com/6KmGbxhh.jpg' },
];

export function Tetons2021() {
  return (
    <>
      <div id='landscape-container'>
        <BackArrow />
        <h1 className='photos-header'>Grand Tetons</h1>
        <section id='photos'>
          {map(images, (image) => (
            <img key={image.src} src={image.src} alt={image.alt} />
          ))}
        </section>
      </div>
    </>
  );
}
