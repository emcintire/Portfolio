import './Logo.css';
import { useLayoutEffect, useRef, useState } from 'react';

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

export function Logo() {
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
    <div id="logo" aria-hidden="true">
      <svg
        ref={svgRef}
        className="topography-shape"
        width="100%"
        height="auto"
        viewBox="0 0 1200 700"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {layers.map((layer, index) => {
          const isSmallest = index === layers.length - 1;
          return (
            <path
              key={index}
              ref={isSmallest ? smallestRef : undefined}
              d="M734.567 34.372c-28.692 61.724-23.266 100.422 16.275 116.094 59.313 23.508 200.347 32.911 259.299 83.906 58.95 50.994 238.697 11.572 269.438-75.95C1310.32 70.9 1365.669-64 1073.808-64c-194.576 0-307.654 32.79-339.24 98.372h-.001z"
              fill={layer.fill}
              fillRule="nonzero"
              transform={layer.transform}
              style={{ position: 'relative', zIndex: index }}
            />
          );
        })}
      </svg>
      {nameBox && (
        <div
          ref={nameRef}
          className="name"
          style={{
            left: `${nameBox.left}px`,
            top: `${nameBox.top}px`,
            width: `${nameBox.width}px`,
            height: `${nameBox.height}px`,
          }}
        >
          <span style={{ fontSize: `${fontPx}px` }}>Everett <br /> McIntire</span>
        </div>
      )}
    </div>
  );
}
