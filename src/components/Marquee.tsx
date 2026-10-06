'use client';

import { Fragment, useEffect, useRef } from 'react';

import { prefersReducedMotion } from '@/lib/motion';

/** Resting drift, in pixels per second. */
const BASE_SPEED = 60;
/** How much each pixel of scroll adds to the drift, before it decays away. */
const SCROLL_BOOST = 0.12;
/** Per-frame decay of that boost, so a flick of the wheel surges then settles. */
const BOOST_DECAY = 0.92;

export function Marquee({ items }: { items: readonly string[] }) {
  const bandRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const band = bandRef.current;
    const track = trackRef.current;
    if (!band || !track || prefersReducedMotion()) return undefined;

    let runWidth = track.scrollWidth / 2;
    let offset = 0;
    let direction = 1;
    let boost = 0;
    let lastScrollY = window.scrollY;
    let lastTime = 0;
    let frame = 0;

    const tick = (time: number) => {
      const elapsed = lastTime ? Math.min(time - lastTime, 64) / 1000 : 0;
      lastTime = time;
      boost *= BOOST_DECAY;
      offset -= direction * (BASE_SPEED * elapsed + boost);
      // Wrap into (-runWidth, 0] so the second run takes over seamlessly.
      if (runWidth > 0) offset = ((offset % runWidth) - runWidth) % runWidth;
      track.style.transform = `translate3d(${offset.toFixed(2)}px, 0, 0)`;
      frame = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (frame) return;
      lastTime = 0;
      frame = window.requestAnimationFrame(tick);
    };
    const stop = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
    };

    const handleScroll = () => {
      const delta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      if (delta === 0) return;
      direction = delta > 0 ? 1 : -1;
      boost = Math.min(boost + Math.abs(delta) * SCROLL_BOOST, 40);
    };

    // Only spend frames while the band is on screen.
    const visibility = new IntersectionObserver(([entry]) =>
      entry?.isIntersecting ? start() : stop(),
    );
    const resize = new ResizeObserver(() => {
      runWidth = track.scrollWidth / 2;
    });

    visibility.observe(band);
    resize.observe(track);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      stop();
      visibility.disconnect();
      resize.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Repeated within each run so one run is wider than any screen.
  const run = [...items, ...items];

  return (
    <div aria-hidden="true" className="marquee" ref={bandRef}>
      <div className="marquee__track" ref={trackRef}>
        {[0, 1].map((copy) => (
          <div className="marquee__run" key={copy}>
            {run.map((item, index) => (
              <Fragment key={`${item}-${index}`}>
                <span
                  className={index % 2 ? 'marquee__item marquee__item--outline' : 'marquee__item'}
                >
                  {item}
                </span>
                <span className="marquee__star">✦</span>
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
