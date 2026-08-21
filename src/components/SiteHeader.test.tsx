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

  it('cycles system, light and dark, and says which is active', () => {
    // The matchMedia stub reports no dark preference, so "system" resolves light.
    renderHeader();

    const atSystem = screen.getByRole('button', { name: /Following system theme/i });
    expect(atSystem).toHaveAccessibleName(/Switch to light theme/i);

    fireEvent.click(atSystem);
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');

    const atLight = screen.getByRole('button', { name: /Using light theme/i });
    fireEvent.click(atLight);
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');

    // Third click returns to system — the state the old toggle could never
    // reach once a preference had been stored.
    fireEvent.click(screen.getByRole('button', { name: /Using dark theme/i }));
    expect(screen.getByRole('button', { name: /Following system theme/i })).toBeInTheDocument();
  });
});
