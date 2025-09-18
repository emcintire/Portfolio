import { BackArrow } from '../../../../../Buttons/BackArrow.tsx';

const images = [
  { alt: 'Cloudy golden gate bridge', src: 'https://i.imgur.com/TIOUR0jh.jpg' },
  { alt: 'Golden gate bridge', src: 'https://i.imgur.com/F6faSNHh.jpg' },
  { alt: 'Welcome to oregon sign', src: 'https://i.imgur.com/r6M4uBSh.jpg' },
  { alt: 'No skateboarding sign', src: 'https://i.imgur.com/D51aCZYh.jpg' },
  { alt: 'Mount Rushmore', src: 'https://i.imgur.com/Oh3EccTh.jpg' },
  { alt: 'Smoke filled woods', src: 'https://i.imgur.com/P1sjmZGh.jpg' },
  { alt: 'Tree with smoke behind', src: 'https://i.imgur.com/iDD2jZRh.jpg' },
  { alt: 'Rocky beach shore', src: 'https://i.imgur.com/tkF9Tioh.jpg' },
  { alt: 'Tree stump', src: 'https://i.imgur.com/gojJX3Ch.jpg' },
  { alt: 'Red flowers on cliff', src: 'https://i.imgur.com/SoZVotmh.jpg' },
  { alt: 'Yellow plant on cliff', src: 'https://i.imgur.com/RAe8QDNh.jpg' },
  { alt: 'Seagull flying over ocean', src: 'https://i.imgur.com/teUSujUh.jpg' },
  { alt: 'Sandy beach trail', src: 'https://i.imgur.com/GRo0G5Rh.jpg' },
  { alt: 'Rocky river bed', src: 'https://i.imgur.com/2E8xqhch.jpg' },
  { alt: 'Sandy beach trail', src: 'https://i.imgur.com/X4N3X1Jh.jpg' },
  { alt: 'Sandy beach trail', src: 'https://i.imgur.com/rhnKrmJh.jpg' },
  { alt: 'Snow covered mount rainier', src: 'https://i.imgur.com/vLK0bT4h.jpg' },
  { alt: 'Rocky river bed', src: 'https://i.imgur.com/YS97q7jh.jpg' },
  { alt: 'Big redwood tree', src: 'https://i.imgur.com/ZMJ94LXh.jpg' },
  { alt: 'Badlands national park welcome sign', src: 'https://i.imgur.com/EyZ4X0Zh.jpg' },
  { alt: 'Flowers with Mount Rainier in back', src: 'https://i.imgur.com/pcPTuKFh.jpg' },
  { alt: 'Park entrance sign', src: 'https://i.imgur.com/NoRjKlqh.jpg' },
  { alt: 'Elk in field', src: 'https://i.imgur.com/q4H9zcQh.jpg' },
  { alt: 'Elk in field', src: 'https://i.imgur.com/lJU5X3rh.jpg' },
  { alt: 'Blue lake with mountains behind', src: 'https://i.imgur.com/eXJKwYeh.jpg' },
  { alt: 'Rocky beach cliff', src: 'https://i.imgur.com/gqpChVnh.jpg' },
  { alt: 'Paul bunyan statue', src: 'https://i.imgur.com/eK0DSrNh.jpg' },
  { alt: 'Sandy beach trail', src: 'https://i.imgur.com/SD4FZBfh.jpg' },
  { alt: 'Road with trees on either side', src: 'https://i.imgur.com/6qF4n5Oh.jpg' },
  { alt: 'Rocky stone bridge', src: 'https://i.imgur.com/8idmR3Nh.jpg' },
  { alt: 'Snow covered mount rainier', src: 'https://i.imgur.com/rB9gzRmh.jpg' },
  { alt: 'Rocky beach shore', src: 'https://i.imgur.com/l7Hkeaeh.jpg' },
  { alt: 'Blue lake with mountains behind', src: 'https://i.imgur.com/TbxcPLPh.jpg' },
  { alt: 'Snow covered mount rainier', src: 'https://i.imgur.com/09KiGvth.jpg' },
  { alt: 'Snow covered mount rainier', src: 'https://i.imgur.com/z0IqDWHh.jpg' },
  { alt: 'Glacier national park welcome sign', src: 'https://i.imgur.com/SkMfJ2Uh.jpg' },
  { alt: 'Blue lake with mountains behind', src: 'https://i.imgur.com/EIyHck5h.jpg' },
  { alt: 'Blue lake with mountains behind', src: 'https://i.imgur.com/wZElGBrh.jpg' },
  { alt: 'Blue lake with mountains behind', src: 'https://i.imgur.com/ZQLyDULh.jpg' },
  { alt: 'Blue lake with mountains behind', src: 'https://i.imgur.com/GzZWZiih.jpg' },
  { alt: 'Blue lake with mountains behind', src: 'https://i.imgur.com/cUsxi9Ah.jpg' },
  { alt: 'Badlands national park', src: 'https://i.imgur.com/oXTFT6Sh.jpg' },
  { alt: 'Badlands national park', src: 'https://i.imgur.com/CqzDWNqh.jpg' },
  { alt: 'Mountain goat in badlands national park', src: 'https://i.imgur.com/PjoaX88h.jpg' },
  { alt: 'Frog in river', src: 'https://i.imgur.com/7n1k0POh.jpg' },
  { alt: 'Tsunami warning sign', src: 'https://i.imgur.com/P45nT1eh.jpg' },
  { alt: 'Elk in field', src: 'https://i.imgur.com/OUlKrXKh.jpg' },
  { alt: 'Frog in river', src: 'https://i.imgur.com/NVEPX8Ph.jpg' },
];

export function Roadtrip2018() {
  return (
    <>
      <div id='landscape-container'>
        <BackArrow />
        <h1 className='photos-header'>Roadtrip</h1>
        <section id='photos'>
          {images.map((image) => (
            <img key={image.src} src={image.src} alt={image.alt} />
          ))}
        </section>
      </div>
    </>
  );
}
