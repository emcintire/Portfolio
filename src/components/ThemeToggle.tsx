'use client';

import { useTheme } from 'next-themes';
import { type MouseEvent, useSyncExternalStore } from 'react';
import { flushSync } from 'react-dom';

import { runViewTransition } from '@/lib/motion';

import { Icon } from './Icon';

const subscribeToNothing = () => () => {};

const REVEAL_MS = 700;

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const hasMounted = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );

  const isDark = resolvedTheme === 'dark';
  const next = isDark ? 'light' : 'dark';
  const label = hasMounted ? `Switch to ${next} theme` : 'Toggle theme';

  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    const theme = hasMounted ? next : 'dark';
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const transition = runViewTransition('theme', () => flushSync(() => setTheme(theme)));

    transition?.ready
      .then(() => {
        const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          {
            duration: REVEAL_MS,
            easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
            pseudoElement: '::view-transition-new(root)',
          },
        );
      })
      .catch(() => undefined);
  };

  return (
    <button
      aria-label={label}
      className="icon-button theme-toggle"
      onClick={toggle}
      title={label}
      type="button"
    >
      <Icon name={hasMounted && isDark ? 'sun' : 'moon'} />
    </button>
  );
}
