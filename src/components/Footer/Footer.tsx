import './Footer.css';
import { useLocation } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { socialLinks } from '@/data/socialLinks';

const d = new Date();
const currentYear = d.getFullYear();

export function Footer() {
  const { pathname } = useLocation();

  if (pathname === '/') { return null; }

  return (
    <footer id="footer">
      <div className="footer-links">
        {socialLinks.map((link) => (
          <a key={link.name} href={link.url} target="_blank" rel="noreferrer" aria-label={link.name}>
            <IconButton size="small" aria-label={link.name}>
              <link.icon className="footer-icon" />
            </IconButton>
          </a>
        ))}
      </div>
      <span className="footer-copy">&copy; {currentYear} Everett McIntire</span>
    </footer>
  );
}
