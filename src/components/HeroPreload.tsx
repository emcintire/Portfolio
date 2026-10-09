'use client';

import { useEffect } from 'react';

/**
 * The category hero's `sizes`. The preload below must ask for exactly what the
 * hero will, or the browser picks a different srcset candidate and the
 * warmed-up copy goes unused.
 */
export const CATEGORY_HERO_SIZES = '100vw';

/** Longest to wait for an idle moment before fetching anyway. */
const IDLE_TIMEOUT_MS = 2000;

/**
 * Downloads a category's full-width hero in the background, once the current
 * page has settled, so it's already cached when the card is clicked. Next
 * prefetches the route on its own, but not the images on it, so without this
 * the hero only starts loading after the navigation.
 */
export function HeroPreload({ sizes, srcSet }: { sizes: string; srcSet: string }) {
  useEffect(() => {
    // Cleanup only cancels a fetch that hasn't started: clicking the card is
    // what unmounts this, and that's exactly when the download must carry on.
    const load = () => {
      const image = new Image();
      image.sizes = sizes;
      image.srcset = srcSet;
    };

    // Safari only gained requestIdleCallback recently.
    if (typeof window.requestIdleCallback === 'function') {
      const handle = window.requestIdleCallback(load, { timeout: IDLE_TIMEOUT_MS });
      return () => window.cancelIdleCallback(handle);
    }

    const handle = window.setTimeout(load, IDLE_TIMEOUT_MS / 2);
    return () => window.clearTimeout(handle);
  }, [sizes, srcSet]);

  return null;
}
