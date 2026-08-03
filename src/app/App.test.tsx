import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { ThemeProvider } from '@/contexts/ThemeContext';

import { App } from './App';

const renderRoute = (route: string) =>
  render(
    <ThemeProvider>
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    </ThemeProvider>,
  );

describe('App routes', () => {
  it('renders a clear home-page value proposition', async () => {
    renderRoute('/');

    expect(
      await screen.findByRole('heading', {
        level: 1,
        name: /I build products that stay useful after the demo/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View selected work' })).toHaveAttribute(
      'href',
      '/projects',
    );
  });

  it('renders a helpful not-found experience for invalid albums', async () => {
    renderRoute('/photography/landscape/not-a-real-album');

    expect(
      await screen.findByRole('heading', {
        level: 1,
        name: /This trail ends here/i,
      }),
    ).toBeInTheDocument();
  });
});
