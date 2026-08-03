import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { ThemeProvider } from '@/contexts/ThemeContext';

import { SiteHeader } from './SiteHeader';

const renderHeader = () =>
  render(
    <ThemeProvider>
      <MemoryRouter>
        <SiteHeader />
      </MemoryRouter>
    </ThemeProvider>,
  );

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

  it('updates the theme and describes the next available theme', () => {
    renderHeader();
    const themeButton = screen.getByRole('button', { name: 'Use dark theme' });

    fireEvent.click(themeButton);

    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(screen.getByRole('button', { name: 'Use light theme' })).toBeInTheDocument();
  });
});
