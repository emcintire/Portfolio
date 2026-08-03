import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { navigation } from '@/data/site';

import { Icon } from './Icon';
import { ThemeToggle } from './ThemeToggle';

export function SiteHeader() {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstLinkRef.current?.focus();

    const handleMenuKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        window.requestAnimationFrame(() => menuButtonRef.current?.focus());
        return;
      }

      if (event.key !== 'Tab') return;
      const menu = document.querySelector<HTMLElement>('#mobile-navigation');
      const focusableElements = Array.from(
        menu?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [],
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener('keydown', handleMenuKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleMenuKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <NavLink aria-label="Everett McIntire, home" className="wordmark" to="/">
          <span className="wordmark__mark" aria-hidden="true">
            EM
          </span>
          <span className="wordmark__text">Everett McIntire</span>
        </NavLink>

        <nav aria-label="Primary navigation" className="desktop-nav">
          {navigation.map((item) => (
            <NavLink
              className={({ isActive }) => `nav-link${isActive ? ' nav-link--active' : ''}`}
              end={item.href === '/'}
              key={item.href}
              to={item.href}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="site-header__actions">
          <ThemeToggle />
          <button
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="icon-button menu-toggle"
            onClick={() => setIsMenuOpen((open) => !open)}
            ref={menuButtonRef}
            type="button"
          >
            <Icon name={isMenuOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <>
          <button
            aria-label="Close navigation menu"
            className="menu-backdrop"
            onClick={() => setIsMenuOpen(false)}
            type="button"
          />
          <nav aria-label="Mobile navigation" className="mobile-nav" id="mobile-navigation">
            {navigation.map((item, index) => (
              <NavLink
                className={({ isActive }) =>
                  `mobile-nav__link${isActive ? ' mobile-nav__link--active' : ''}`
                }
                end={item.href === '/'}
                key={item.href}
                ref={index === 0 ? firstLinkRef : undefined}
                to={item.href}
              >
                {item.label}
              </NavLink>
            ))}
            <a
              className="button button--primary mobile-nav__contact"
              href="mailto:everettgmcintire@gmail.com"
            >
              Start a conversation
            </a>
          </nav>
        </>
      )}
    </header>
  );
}
