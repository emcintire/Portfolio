import './Home.css';
import { FloatingLinks } from '../../FloatingLinks/FloatingLinks.tsx';
import { Logo } from '../../Logo/Logo.tsx';

export function Home() {
  return (
    <div id="home-page">
      <FloatingLinks />
      <Logo />
    </div>
  );
}
