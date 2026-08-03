import { useTheme } from '@/contexts/theme';

import { Icon } from './Icon';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
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
