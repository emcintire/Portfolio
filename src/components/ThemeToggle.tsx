'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Icon } from './Icon';

/**
 * Cycles system -> light -> dark -> system.
 *
 * The third state is the point of the switch to next-themes: previously the
 * first click wrote a preference to storage and the OS setting was ignored for
 * good, with no way back. "System" is now both the default and reachable again.
 */
const ORDER = ['system', 'light', 'dark'] as const;

const LABELS = {
  dark: 'Using dark theme',
  light: 'Using light theme',
  system: 'Following system theme',
} as const;

export function ThemeToggle() {
  const { resolvedTheme, setTheme, theme } = useTheme();
  // The server cannot know the visitor's stored preference, so render
  // theme-neutral until mount. Guessing would mismatch on hydration for anyone
  // whose theme is not the default.
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => setHasMounted(true), []);

  if (!hasMounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="icon-button theme-toggle"
        onClick={() => setTheme('light')}
        title="Toggle theme"
        type="button"
      >
        <Icon name="moon" />
      </button>
    );
  }

  const current = (ORDER as readonly string[]).includes(theme ?? '')
    ? (theme as (typeof ORDER)[number])
    : 'system';
  const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];

  return (
    <button
      aria-label={`${LABELS[current]}. Switch to ${next} theme.`}
      className="icon-button theme-toggle"
      onClick={() => setTheme(next)}
      title={`${LABELS[current]} — switch to ${next}`}
      type="button"
    >
      {/* System shows whichever theme it resolved to, so the icon stays honest. */}
      <Icon name={(current === 'system' ? resolvedTheme : current) === 'dark' ? 'sun' : 'moon'} />
    </button>
  );
}
