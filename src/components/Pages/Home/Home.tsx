import './Home.css';
import { FloatingLinks } from '../../FloatingLinks/FloatingLinks.tsx';
import { Logo } from '../../Logo/Logo.tsx';

export function Home() {
  return (
    <div id="home-page">
      <h1 className="sr-only">Everett McIntire — Full Stack Software Engineer</h1>
      <FloatingLinks />
      <Logo />
    </div>
  );
}
