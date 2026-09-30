'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Icon } from './Icon';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // The server cannot know the visitor's theme, so render theme-neutral until
  // mount. Guessing would mismatch on hydration for anyone not on the default.
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => setHasMounted(true), []);

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
