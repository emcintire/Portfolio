import Link from 'next/link';

import { siteMetadata } from '@/data/site';
import { socialLinks } from '@/data/socialLinks';

import { Icon } from './Icon';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <Link className="site-footer__name" href="/">
            {siteMetadata.name}
          </Link>
          <p>Engineering thoughtful products and photographing the places between them.</p>
        </div>

        <div className="social-links" aria-label="Social profiles">
          {socialLinks.map((link) => (
            <a
              aria-label={`${link.name} — opens in a new tab`}
              className="icon-button"
              href={link.url}
              key={link.name}
              rel="noreferrer"
              target="_blank"
            >
              <Icon name={link.icon} />
            </a>
          ))}
        </div>
      </div>
      <div className="site-footer__legal">
        <span>© {new Date().getFullYear()} Everett McIntire</span>
        <span>Built with React, TypeScript, and restraint.</span>
      </div>
    </footer>
  );
}
