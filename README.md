# Everett McIntire Portfolio

A responsive engineering and photography portfolio built with React, TypeScript, React Router,
and Vite.

## Development

Requires Node.js 22 or newer.

```bash
npm ci
npm run dev
```

The development server runs at `http://localhost:3000`.

## Quality commands

```bash
npm run check      # formatting, lint, typecheck, unit tests, and production build
npm run test:e2e   # Chromium, Firefox, WebKit, mobile, and axe accessibility tests
```

Install Playwright's local browsers before the first end-to-end run:

```bash
npx playwright install chromium firefox webkit
```

## Architecture

- `src/app` — routing and application composition
- `src/components` — reusable layout and interaction components
- `src/contexts` — persisted light/dark theme
- `src/data` — typed project, experience, social, and gallery catalogs
- `src/pages` — lazy-loaded route components
- `src/assets/optimized` — responsive WebP/AVIF images and compressed video
- `tests/e2e` — browser, responsive-layout, keyboard, and accessibility coverage

Gallery routes are generated from one typed catalog. Photographs are loaded in batches, thumbnails
use stable aspect ratios, full-size assets are fetched only when the viewer opens, and missing alt
text receives an album-aware fallback.

## Deployment

Build with `npm run build` and deploy the `dist` directory. The host must serve `index.html` as the
fallback for unknown paths so React Router can handle direct visits to nested routes.
