import "./Footer.css";
import { useLocation } from 'react-router-dom';

const d = new Date();
const currentYear = d.getFullYear();

export function Footer() {
  const { pathname } = useLocation();

  if (pathname === '/') { return null; }

  return (
    <footer id="footer">
      &copy; Copyright {currentYear}, Everett Gregory Shourt McIntire
    </footer>
  );
}
