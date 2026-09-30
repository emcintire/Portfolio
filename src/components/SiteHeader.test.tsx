import { fireEvent, render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ThemeProvider } from '@/contexts/ThemeContext';

import { SiteHeader } from './SiteHeader';

let mockPathname = '/';
vi.mock('next/navigation', () => ({ usePathname: () => mockPathname }));

beforeEach(() => {
  mockPathname = '/';
});

const renderHeader = () =>
  render(
    <ThemeProvider>
      <SiteHeader />
    </ThemeProvider>,
  );

const primaryNavLink = (name: string) =>
  within(screen.getByRole('navigation', { name: 'Primary navigation' })).getByRole('link', {
    name,
  });

describe('SiteHeader', () => {
  it('opens and closes the mobile navigation with accessible state', () => {
    renderHeader();
    const menuButton = screen.getByRole('button', { name: 'Open navigation menu' });

    fireEvent.click(menuButton);
    expect(screen.getByRole('navigation', { name: 'Mobile navigation' })).toBeInTheDocument();
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    expect(menuButton).toHaveAccessibleName('Close navigation menu');

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument();
  });

  it('marks only the matching nav item active on a top-level route', () => {
    renderHeader();

    expect(primaryNavLink('Home')).toHaveClass('nav-link--active');
    expect(primaryNavLink('Photography')).not.toHaveClass('nav-link--active');
  });

  it('keeps a section active on its nested routes but does not match Home everywhere', () => {
    mockPathname = '/photography/some-category/some-album';
    renderHeader();

    expect(primaryNavLink('Photography')).toHaveClass('nav-link--active');
    expect(primaryNavLink('Home')).not.toHaveClass('nav-link--active');
  });

  it('flips the visible theme on every click', () => {
    // The matchMedia stub reports no dark preference, so system resolves light.
    renderHeader();

    const toLight = screen.getByRole('button', { name: /Switch to dark theme/i });
    fireEvent.click(toLight);
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');

    // The regression this replaced: a click that changed nothing on screen.
    const toDark = screen.getByRole('button', { name: /Switch to light theme/i });
    fireEvent.click(toDark);
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
  });
});
