import './Home.css';
import { map } from 'lodash';
import { FloatingLinks } from '../../Navbar/FloatingLinks';
import { useLayoutEffect, useRef, useState } from 'react';
import { Logo } from '../../Logo';
import { Box } from '@mui/material';

const layers = [
  { transform: `translate(-1350, 45) scale(2.35) skewX(22.5)`, fill: "rgb(1, 28, 81)" },
  { transform: `translate(-1200, 40) scale(2.2) skewX(20)`, fill: "rgb(0, 107, 149)" },
  { transform: `translate(-1050, 35) scale(2.05) skewX(17.5)`, fill: "rgb(1, 138, 156)" },
  { transform: `translate(-900, 30) scale(1.9) skewX(15)`, fill: "rgb(109, 177, 164)" },
  { transform: `translate(-750, 25) scale(1.75) skewX(12.5)`, fill: "rgb(255, 233, 183)" },
  { transform: `translate(-600, 20) scale(1.6) skewX(10)`, fill: "rgba(255, 191, 134, 1)" },
  { transform: `translate(-450, 15) scale(1.45) skewX(7.5)`, fill: "rgb(254, 170, 97)" },
  { transform: `translate(-300, 10) scale(1.3) skewX(5)`, fill: "rgba(255, 129, 61, 1)" },
  { transform: `translate(-150, 5) scale(1.15) skewX(2.5)`, fill: "rgb(255, 106, 26)" },
];

type Box = { left: number; top: number; width: number; height: number };

export function Home() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const smallestRef = useRef<SVGPathElement | null>(null);
  const nameRef = useRef<HTMLDivElement | null>(null);

  const [nameBox, setNameBox] = useState<Box | null>(null);
  const [fontPx, setFontPx] = useState<number>(0);

  useLayoutEffect(() => {
    if (!smallestRef.current) return;

    const measure = () => {
      const el = smallestRef.current!;
      const rect = el.getBoundingClientRect();
      const box: Box = {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      };
      setNameBox(box);

      const size = Math.max(12, Math.floor(Math.min(box.width, box.height) * 0.2));
      setFontPx(size);
    };

    const ro = new ResizeObserver(measure);
    if (svgRef.current) ro.observe(svgRef.current);

    if ((document as any).fonts?.ready) {
      (document as any).fonts.ready.then(measure);
    }

    window.addEventListener('resize', measure);
    measure();

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <div id="home-page">
      <FloatingLinks />
      <Logo />
    </div>
  );
}
