'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';

import { Icon } from './Icon';

const subscribeToNothing = () => () => {};

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

  return (
    <button
      aria-label={label}
      className="icon-button theme-toggle"
      onClick={() => setTheme(hasMounted ? next : 'dark')}
      title={label}
      type="button"
    >
      <Icon name={hasMounted && isDark ? 'sun' : 'moon'} />
    </button>
  );
}
