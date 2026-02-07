import './About.css';
import { Stack } from '@mui/material';
import Skills from './Skills/Skills';
import Experience from './Experience/Experience';
import Profile from './Profile/Profile';
import { useRevealOnIntersect } from '@/helpers';

export function About() {
  const revealRef = useRevealOnIntersect();

  return (
    <div id='about-page'>
      <Stack className="about-container" alignItems="center" spacing={8}>
        <Profile />
        <div className="about-section reveal-item" ref={revealRef}>
          <Experience />
        </div>
        <div className="about-section reveal-item" ref={revealRef}>
          <Skills />
        </div>
      </Stack>
    </div>
  );
}
