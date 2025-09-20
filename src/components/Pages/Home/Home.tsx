import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { map } from 'lodash';
import './Home.css';
import name from '../../../assets/everett.svg';

type Node = {
  id: string;
  to: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  frozen: boolean;
};

const START: Omit<Node, 'x' | 'y' | 'vx' | 'vy' | 'frozen'>[] = [
  { id: 'about', to: '/about' },
  { id: 'photography', to: '/photography' },
  { id: 'projects', to: '/projects' },
];

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

export function Home() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef(0);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [isLaunching, setIsLaunching] = useState(true);
  const mouse = useRef({ x: 0, y: 0, inside: false });

  const radius = 175;
  const friction = isLaunching ? 0.99 : 0.96;
  const maxSpeed = isLaunching ? 5000 : 300;
  const wallBounce = isLaunching ? 0.9 : 0.5;
  const nudgeRadius = 500;
  const nudgeStrength = 2000;
  const restCutoff = 2.5;

  const restitution = 0.7;
  const correctionPercent = 0.9
  const slop = 0.5;

  useEffect(() => {
    const el = wrapRef.current!;
    const rect = el.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const r = Math.min(rect.width, rect.height) * 0.22;

    setNodes(START.map((s, i) => {
      const ang = (i / START.length) * Math.PI * 2;
      // Add random initial velocity for momentum effect
      const launchSpeed = 5000 + Math.random() * 300; // 200-500 px/sec
      const launchAngle = Math.random() * Math.PI * 2;
      return {
        ...s,
        x: cx + Math.cos(ang) * r,
        y: cy + Math.sin(ang) * r,
        vx: Math.cos(launchAngle) * launchSpeed,
        vy: Math.sin(launchAngle) * launchSpeed,
        frozen: false,
      };
    }));

    // Turn off launch mode after initial chaos settles
    const timer = setTimeout(() => setIsLaunching(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const rect = wrapRef.current!.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
      mouse.current.inside = true;
    };
    const onLeave = () => { mouse.current.inside = false; };

    const el = wrapRef.current!;
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  useEffect(() => {
    let prev = performance.now();

    const tick = () => {
      const now = performance.now();
      const dt = Math.min((now - prev) / 1000, 1 / 30);
      prev = now;

      setNodes((curr) => {
        if (!curr.length) return curr;
        const next = map(curr, (n) => ({ ...n }));

        const rect = wrapRef.current!.getBoundingClientRect();

        // 1) Integrate forces per node (skip if frozen)
        for (const n of next) {
          if (n.frozen) continue;

          const adjustedRadius = n.id === 'about' ? 150 : radius;
          const minX = adjustedRadius + 8;
          const maxX = rect.width - (adjustedRadius + 8);
          const minY = adjustedRadius + 8;
          const maxY = rect.height - (adjustedRadius + 8);

          // initialize acceleration
          let ax = 0;
          let ay = 0;

          // mouse nudge (repel)
          if (mouse.current.inside) {
            const dx = n.x - mouse.current.x;
            const dy = n.y - mouse.current.y;
            const d = Math.hypot(dx, dy);
            if (d < nudgeRadius) {
              const ux = dx / (d || 1);
              const uy = dy / (d || 1);
              const s = nudgeStrength * (1 - d / nudgeRadius);
              ax += ux * s;
              ay += uy * s;
            }
          }

          // integrate velocity
          n.vx += ax * dt;
          n.vy += ay * dt;

          // clamp speed
          const sp = Math.hypot(n.vx, n.vy);
          if (sp > maxSpeed) {
            const s = maxSpeed / sp;
            n.vx *= s;
            n.vy *= s;
          }

          // integrate position
          n.x += n.vx * dt;
          n.y += n.vy * dt;

          // walls (center-based with bounce)
          if (n.x < minX) { n.x = minX; n.vx = -n.vx * wallBounce; }
          if (n.x > maxX) { n.x = maxX; n.vx = -n.vx * wallBounce; }
          if (n.y < minY) { n.y = minY; n.vy = -n.vy * wallBounce; }
          if (n.y > maxY) { n.y = maxY; n.vy = -n.vy * wallBounce; }

          // friction + rest snap
          n.vx *= friction;
          n.vy *= friction;
          if (Math.hypot(n.vx, n.vy) < restCutoff) { n.vx = 0; n.vy = 0; }
        }

        // 2) Elastic collisions (equal mass) + positional correction
        const R = radius * 2;
        for (let i = 0; i < next.length; i++) {
          for (let j = i + 1; j < next.length; j++) {
            const a = next[i], b = next[j];

            const dx = b.x - a.x;
            const dy = b.y - a.y;
            let d = Math.hypot(dx, dy);
            if (!d) d = 0.0001;

            if (d < R) {
              const nx = dx / d;
              const ny = dy / d;
              const penetration = R - d;

              // positional correction to remove overlap
              const corr = Math.max(penetration - slop, 0) * 0.5 * correctionPercent;
              a.x -= nx * corr; a.y -= ny * corr;
              b.x += nx * corr; b.y += ny * corr;

              // if either is frozen, treat as static: remove normal velocity
              if (a.frozen || b.frozen) {
                const projA = a.vx * nx + a.vy * ny;
                const projB = b.vx * nx + b.vy * ny;
                a.vx -= projA * nx; a.vy -= projA * ny;
                b.vx -= projB * nx; b.vy -= projB * ny;
              } else {
                // elastic impulse (equal mass)
                const rvx = b.vx - a.vx;
                const rvy = b.vy - a.vy;
                const velAlongN = rvx * nx + rvy * ny;

                if (velAlongN < 0) {
                  const jImp = -(1 + restitution) * velAlongN / 2;
                  const ix = jImp * nx;
                  const iy = jImp * ny;
                  a.vx -= ix; a.vy -= iy;
                  b.vx += ix; b.vy += iy;
                }
              }
            }
          }
        }

        return next;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const onEnter = (id: string) => setNodes(ns => map(ns, ((n) => n.id === id
    ? { ...n, frozen: true, vx: 0, vy: 0 }
    : n)));

  const onLeave = (id: string) => setNodes(ns => map(ns, ((n) => n.id === id
    ? { ...n, frozen: false }
    : n)));

  return (
    <div ref={wrapRef} className="home-wrap" aria-label="Home navigation">
      {nodes.map((n) => (
        <Link
          key={n.id}
          to={n.to}
          className={`float-link ${n.id}`}
          style={{ transform: `translate(-50%, -50%) translate(${n.x}px, ${n.y}px)` }}
          onMouseEnter={() => onEnter(n.id)}
          onMouseLeave={() => onLeave(n.id)}
        />
      ))}
      <svg
        className="topography-shape"
        width="100%"
        height="auto"
        viewBox='0 0 1200 700'
        xmlns="http://www.w3.org/2000/svg">
        {map(layers, (layer, index) => (
          <path
            key={index}
            d="M734.567 34.372c-28.692 61.724-23.266 100.422 16.275 116.094 59.313 23.508 200.347 32.911 259.299 83.906 58.95 50.994 238.697 11.572 269.438-75.95C1310.32 70.9 1365.669-64 1073.808-64c-194.576 0-307.654 32.79-339.24 98.372h-.001z"
            fill={layer.fill}
            fillRule="nonzero"
            transform={layer.transform}
            style={{ position: "relative", zIndex: index }}
          />
        ))}
      </svg>
      <img src={name} className="name" />
    </div>
  );
}
