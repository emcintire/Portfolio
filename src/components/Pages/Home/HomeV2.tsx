import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

type Node = {
  id: string;
  label: string;
  to: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  wobble: number;
  frozen: boolean;
};

const START: Omit<Node, 'x' | 'y' | 'vx' | 'vy' | 'wobble' | 'frozen'>[] = [
  { id: 'about',   label: 'About',   to: '/about' },
  { id: 'photography', label: 'Photography', to: '/photography' },
  { id: 'projects',    label: 'Projects',    to: '/projects' },
];

export default function HomeV2() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef(0);
  const [nodes, setNodes] = useState<Node[]>([]);
  const mouse = useRef({ x: 0, y: 0, inside: false });

  const radius = 100;            // interaction radius ~ pill half-size
  const friction = 0.96;        // higher drag so they slow quickly
  const maxSpeed = 300;         // px/sec cap
  const wallBounce = 0.5;       // energy kept after wall hit
  const nudgeRadius = 500;      // px; mouse proximity to repel
  const nudgeStrength = 2000;   // impulse near mouse
  const wanderAmp = 60;         // random wander accel
  const wanderFreq = 1.4;       // Hz
  const restCutoff = 2.5;       // px/sec
  // collisions
  const restitution = 0.7;      // 0=sticky, 1=bouncy
  const correctionPercent = 0.9;// positional correction aggressiveness
  const slop = 0.5;             // allowed tiny overlap before correction

  useEffect(() => {
    const el = wrapRef.current!;
    const rect = el.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const r = Math.min(rect.width, rect.height) * 0.22;

    setNodes(START.map((s, i) => {
      const ang = (i / START.length) * Math.PI * 2;
      return {
        ...s,
        x: cx + Math.cos(ang) * r,
        y: cy + Math.sin(ang) * r,
        vx: 0,
        vy: 0,
        wobble: Math.random() * 1000,
        frozen: false,
      };
    }));
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
        const next = curr.map((n) => ({ ...n }));

        const rect = wrapRef.current!.getBoundingClientRect();
        const minX = radius + 8;
        const maxX = rect.width - (radius + 8);
        const minY = radius + 8;
        const maxY = rect.height - (radius + 8);

        // 1) Integrate forces per node (skip if frozen)
        for (const n of next) {
          if (n.frozen) continue;

          // smooth wander
          n.wobble += dt;
          const phase = n.wobble * wanderFreq * Math.PI * 2;
          let ax = Math.sin(phase + n.x * 0.001) * wanderAmp;
          let ay = Math.cos(phase + n.y * 0.001) * wanderAmp;

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

  const onEnter = (id: string) =>
    setNodes(ns => ns.map(n =>
      n.id === id ? { ...n, frozen: true, vx: 0, vy: 0 } : n));

  const onLeave = (id: string) =>
    setNodes(ns => ns.map(n =>
      n.id === id ? { ...n, frozen: false } : n));

  return (
    <div ref={wrapRef} className="home-wrap" aria-label="Home navigation">
      {nodes.map((n) => (
        <Link
          key={n.id}
          to={n.to}
          className="float-link"
          style={{ transform: `translate(-50%, -50%) translate(${n.x}px, ${n.y}px)` }}
          onMouseEnter={() => onEnter(n.id)}
          onMouseLeave={() => onLeave(n.id)}
        >
          {n.label}
        </Link>
      ))}
    </div>
  );
}
