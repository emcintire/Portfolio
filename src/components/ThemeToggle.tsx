'use client';

import { useEffect, useState } from 'react';

import { useTheme } from '@/contexts/theme';

import { Icon } from './Icon';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  // The server cannot know the visitor's stored theme, so this button renders
  // theme-neutral until mount. Committing to a guess instead would produce a
  // hydration mismatch for every visitor whose theme is not the default.
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => setHasMounted(true), []);

  if (!hasMounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="icon-button theme-toggle"
        onClick={toggleTheme}
        title="Toggle theme"
        type="button"
      >
        <Icon name="moon" />
      </button>
    );
  }

  const nextTheme = theme === 'light' ? 'dark' : 'light';

  return (
    <button
      aria-label={`Use ${nextTheme} theme`}
      className="icon-button theme-toggle"
      onClick={toggleTheme}
      title={`Use ${nextTheme} theme`}
      type="button"
    >
      <Icon name={theme === 'light' ? 'moon' : 'sun'} />
    </button>
  );
}
