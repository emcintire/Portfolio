'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { navigation } from '@/data/site';

import { Icon } from './Icon';
import { ThemeToggle } from './ThemeToggle';

/**
 * Mirrors react-router's `end={href === '/'}`: every nav item except Home stays
 * active across its nested routes, so Photography reads as active on album and
 * category pages too.
 */
const isActiveHref = (pathname: string, href: string) =>
  href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

export function SiteHeader() {
  const pathname = usePathname();
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
        <Link aria-label="Everett McIntire, home" className="wordmark" href="/">
          <span className="wordmark__mark" aria-hidden="true">
            EM
          </span>
          <span className="wordmark__text">Everett McIntire</span>
        </Link>

        <nav aria-label="Primary navigation" className="desktop-nav">
          {navigation.map((item) => (
            <Link
              className={`nav-link${isActiveHref(pathname, item.href) ? ' nav-link--active' : ''}`}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
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
              <Link
                className={`mobile-nav__link${
                  isActiveHref(pathname, item.href) ? ' mobile-nav__link--active' : ''
                }`}
                href={item.href}
                key={item.href}
                ref={index === 0 ? firstLinkRef : undefined}
              >
                {item.label}
              </Link>
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
