'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef } from 'react';

import { canViewTransition, isTransitionableClick, runViewTransition } from '@/lib/motion';

/** Long enough for any prerendered route; past it the wipe gives up and the page just swaps. */
const NAVIGATION_TIMEOUT = 2500;

/**
 * Turns in-app link clicks into a View Transition: the old page lifts away and
 * the new one rises in behind a curved edge (see `html[data-transition='page']`
 * in globals.css).
 *
 * It listens on window in the capture phase, ahead of next/link's own click
 * handler, and calls preventDefault — which Link checks before navigating — so
 * it can start the transition and push the route itself. The transition's
 * update resolves once the new pathname commits, which is when the browser
 * snapshots the new page.
 */
export function PageTransitions() {
  const pathname = usePathname();
  const router = useRouter();
  const settleRef = useRef<(() => void) | null>(null);

  useLayoutEffect(() => {
    settleRef.current?.();
    settleRef.current = null;
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.('a');
      if (!anchor || !isTransitionableClick(event, anchor, window.location)) return;
      // Without transition support (or under reduced motion) Link navigates as usual.
      if (!canViewTransition()) return;

      event.preventDefault();
      runViewTransition(
        'page',
        () =>
          new Promise<void>((resolve) => {
            const timeout = window.setTimeout(resolve, NAVIGATION_TIMEOUT);
            settleRef.current = () => {
              window.clearTimeout(timeout);
              resolve();
            };
            const url = new URL(anchor.href);
            router.push(`${url.pathname}${url.search}${url.hash}`);
          }),
      );
    };

    window.addEventListener('click', handleClick, { capture: true });
    return () => window.removeEventListener('click', handleClick, { capture: true });
  }, [router]);

  return null;
}
