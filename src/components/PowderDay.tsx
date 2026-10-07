'use client';

import { useEffect, useRef, useState } from 'react';

import { prefersReducedMotion } from '@/lib/motion';

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];
const SNOW_MS = 9000;
const FLAKES = 160;

type Flake = { drift: number; r: number; speed: number; sway: number; x: number; y: number };

/** Lets it snow on a full-screen canvas until `until`, then stops drawing. */
function letItSnow(canvas: HTMLCanvasElement, until: number) {
  const context = canvas.getContext('2d');
  if (!context) return () => undefined;

  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const resize = () => {
    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  };
  resize();
  window.addEventListener('resize', resize);

  const flakes: Flake[] = Array.from({ length: FLAKES }, () => ({
    drift: Math.random() * Math.PI * 2,
    r: 1 + Math.random() * 3,
    speed: 40 + Math.random() * 90,
    sway: 10 + Math.random() * 30,
    x: Math.random() * window.innerWidth,
    y: -Math.random() * window.innerHeight,
  }));

  let frame = 0;
  let last = performance.now();
  const draw = (now: number) => {
    const elapsed = Math.min(now - last, 64) / 1000;
    last = now;
    const winding = now > until;
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    // The stylesheet picks a flake color that shows against the current theme.
    context.fillStyle = getComputedStyle(canvas).color;
    let falling = 0;

    for (const flake of flakes) {
      flake.y += flake.speed * elapsed;
      flake.drift += elapsed;
      // Recycle to the top while it's snowing; once it isn't, let them land.
      if (flake.y > window.innerHeight + 10 && !winding) flake.y = -10;
      if (flake.y <= window.innerHeight + 10) falling += 1;
      context.beginPath();
      context.arc(flake.x + Math.sin(flake.drift) * flake.sway, flake.y, flake.r, 0, Math.PI * 2);
      context.fill();
    }

    frame = falling ? window.requestAnimationFrame(draw) : 0;
  };
  frame = window.requestAnimationFrame(draw);

  return () => {
    window.cancelAnimationFrame(frame);
    window.removeEventListener('resize', resize);
  };
}

/**
 * A powder day, for anyone who finds it: the Konami code makes it snow. The
 * console says where to look. Under reduced motion only the note appears.
 */
export function PowderDay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSnowing, setIsSnowing] = useState(false);

  useEffect(() => {
    console.info(
      '%cFresh tracks ahead. ↑ ↑ ↓ ↓ ← → ← → B A',
      'font: 600 14px/1.6 Georgia, serif; color: #9c3d18;',
    );

    let position = 0;
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      position = key === KONAMI[position] ? position + 1 : key === KONAMI[0] ? 1 : 0;
      if (position < KONAMI.length) return;
      position = 0;
      setIsSnowing(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isSnowing) return undefined;
    const canvas = canvasRef.current;
    const stopSnow =
      canvas && !prefersReducedMotion()
        ? letItSnow(canvas, performance.now() + SNOW_MS)
        : () => undefined;
    const done = window.setTimeout(() => setIsSnowing(false), SNOW_MS + 4000);

    return () => {
      stopSnow();
      window.clearTimeout(done);
    };
  }, [isSnowing]);

  return (
    <>
      {isSnowing && <canvas aria-hidden="true" className="powder-day" ref={canvasRef} />}
      <p aria-live="polite" className="powder-day__note" data-visible={isSnowing} role="status">
        {isSnowing ? 'Powder day. Shred responsibly.' : ''}
      </p>
    </>
  );
}
