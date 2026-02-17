import './Home.css';
import { IconButton } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext.tsx';
import { FloatingLinks } from '../../FloatingLinks/FloatingLinks.tsx';
import { Logo } from '../../Logo/Logo.tsx';

export function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div id="home-page">
      <IconButton className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
        {theme === 'light' ? <DarkMode className="dark" /> : <LightMode className="light" />}
      </IconButton>
      <FloatingLinks />
      <Logo />
    </div>
  );
}
