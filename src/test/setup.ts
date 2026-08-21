import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
  localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
  document.body.style.overflow = '';
});

// jsdom has no matchMedia. next-themes subscribes to the colour-scheme query,
// and falls back to the deprecated addListener/removeListener pair when the
// modern ones are absent — so the stub has to provide both or it throws.
Object.defineProperty(window, 'matchMedia', {
  configurable: true,
  value: (query: string) => ({
    addEventListener: () => undefined,
    addListener: () => undefined,
    dispatchEvent: () => false,
    matches: false,
    media: query,
    onchange: null,
    removeEventListener: () => undefined,
    removeListener: () => undefined,
  }),
  writable: true,
});

window.scrollTo = () => undefined;
