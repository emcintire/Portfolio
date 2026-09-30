'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

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
