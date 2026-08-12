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
    mockPathname = '/photography/landscape/rockies2024';
    renderHeader();

    expect(primaryNavLink('Photography')).toHaveClass('nav-link--active');
    expect(primaryNavLink('Home')).not.toHaveClass('nav-link--active');
  });

  it('updates the theme and describes the next available theme', () => {
    renderHeader();
    const themeButton = screen.getByRole('button', { name: 'Use dark theme' });

    fireEvent.click(themeButton);

    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(screen.getByRole('button', { name: 'Use light theme' })).toBeInTheDocument();
  });
});
