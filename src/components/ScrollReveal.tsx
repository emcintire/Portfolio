'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { prefersReducedMotion } from '@/lib/motion';

/** Gap between siblings that come into view together, so a row arrives left to right. */
const STAGGER_MS = 90;

/**
 * Brings `[data-reveal]` elements in as they scroll into view.
 *
 * Only elements still below the fold when the page mounts are hidden, and only
 * from here — so nothing in the first screen ever blinks out, and with no
 * JavaScript, or under reduced motion, everything is simply visible. The
 * hidden and shown states live in globals.css under `[data-reveal-state]`.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) return undefined;
    // Opts the page into effects that hide content until it animates in, like
    // gallery thumbnails developing on load. Without it, nothing is ever hidden.
    document.documentElement.dataset.motion = 'full';

    const observer = new IntersectionObserver(
      (entries) => {
        const arriving = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target as HTMLElement);

        arriving.forEach((element, index) => {
          element.style.setProperty('--reveal-delay', `${index * STAGGER_MS}ms`);
          element.dataset.revealState = 'shown';
          observer.unobserve(element);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );

    const viewportHeight = window.innerHeight;
    const pending = document.querySelectorAll<HTMLElement>(
      '[data-reveal]:not([data-reveal-state="shown"])',
    );
    pending.forEach((element) => {
      // Still hidden from before a navigation: keep waiting for it.
      if (element.dataset.revealState === 'hidden') {
        observer.observe(element);
        return;
      }
      if (element.getBoundingClientRect().top < viewportHeight) return;
      element.dataset.revealState = 'hidden';
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
