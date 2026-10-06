'use client';

import { useEffect, useRef, useState } from 'react';

import { prefersReducedMotion } from '@/lib/motion';

const DURATION_MS = 1600;

/** Splits "10k+" into the number to count to and the text around it. */
export function parseStat(value: string) {
  const match = /^(\D*)(\d+(?:\.\d+)?)(.*)$/.exec(value);
  if (!match) return null;
  const [, prefix = '', number = '0', suffix = ''] = match;
  return { decimals: number.split('.')[1]?.length ?? 0, prefix, suffix, target: Number(number) };
}

/** Fast out of the gate, easing into the final number. */
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - 2 ** (-10 * t));

/**
 * Counts a stat up from zero the first time it scrolls into view.
 *
 * The server renders the final value, and it stays put if the stat is already
 * on screen at mount, under reduced motion, or if the value isn't numeric.
 * Screen readers always get the final value; the ticking digits are hidden
 * from them.
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const element = ref.current;
    const stat = parseStat(value);
    if (!element || !stat || prefersReducedMotion() || !('IntersectionObserver' in window)) {
      return undefined;
    }
    if (element.getBoundingClientRect().top < window.innerHeight) return undefined;

    const format = (n: number) => `${stat.prefix}${n.toFixed(stat.decimals)}${stat.suffix}`;
    let frame = 0;
    // Offscreen, so the jump to zero is never seen.
    setDisplay(format(0));

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - start) / DURATION_MS, 1);
          setDisplay(format(stat.target * easeOutExpo(progress)));
          if (progress < 1) frame = window.requestAnimationFrame(step);
        };
        frame = window.requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <>
      <span aria-hidden="true" ref={ref}>
        {display}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
}
