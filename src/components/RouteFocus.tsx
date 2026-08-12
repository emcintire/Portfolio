'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

/**
 * Moves focus to the main landmark after a client-side navigation, so keyboard
 * and screen-reader users land on the new page's content instead of staying
 * wherever the activated link was.
 *
 * This is the only part of the old RouteEffects component that survives: the
 * App Router already resets scroll on navigation, and per-route metadata is now
 * server-rendered rather than written to the DOM after the fact.
 */
export function RouteFocus() {
  const pathname = usePathname();
  const hasMountedRef = useRef(false);

  useEffect(() => {
    // Don't steal focus on first load — the visitor may be mid-interaction and
    // the browser has its own initial focus behavior.
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      document.querySelector<HTMLElement>('#main-content')?.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
