# Everett McIntire Portfolio

A responsive engineering and photography portfolio built with Next.js (App Router), React, and
TypeScript, deployed on AWS Amplify Hosting.

Every route is prerendered at build time, so each page ships its own title, description, canonical,
share card, and schema.org data in the HTML — no JavaScript required to read it.

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

`test:e2e` builds and serves the production output, because it asserts prerendered HTML and real
status codes. Install Playwright's browsers before the first run:

```bash
npx playwright install chromium firefox webkit
```

## Architecture

- `src/app` — App Router routes, root layout, and the `sitemap`/`robots`/`opengraph-image` metadata
  routes
- `src/components` — reusable layout and interaction components
- `src/contexts` — persisted light/dark theme
- `src/data` — typed project, experience, social, and gallery catalogs
- `src/lib` — metadata builders, schema.org builders, and the anti-FOUC theme script
- `src/assets/optimized` — WebP source images, resized on demand by `next/image`
- `tests/e2e` — browser, responsive-layout, keyboard, accessibility, and SEO coverage

All 26 photography routes are generated from one typed catalog via `generateStaticParams`.
`dynamicParams = false` means an unknown album or category returns a real 404 rather than 404
content behind a 200. The `animals` and `misc` categories render their gallery at the category URL,
so their nested album URL 301s there instead of duplicating it.

The sitemap is generated from the same catalog — `src/app/sitemap.test.ts` guards the mapping, and
`tests/e2e/seo.spec.ts` then checks every sitemap URL resolves to a real prerendered page.

Photographs are hotlinked from Imgur and loaded in batches, full-size assets are fetched only when
the viewer opens, and missing alt text receives an album-aware fallback. They intentionally use
plain `<img>` rather than `next/image`: Imgur already serves a sized thumbnail, so routing them
through the optimizer would add cost and latency for nothing.

## Deployment

Amplify builds from `amplify.yml`, which pins `baseDirectory` to `.next`. The app must run on the
**WEB_COMPUTE** platform; Amplify infers this from the `next build` script.

Next.js is pinned to 15.x deliberately — Amplify Hosting compute supports Next 12 through 15, while
npm `latest` is 16. Do not accept a 16.x upgrade before AWS documents support for it.

When cutting over from the previous Vite SPA deployment:

1. Validate the branch against a separate throwaway Amplify app first. The two changes below are
   app-scoped rather than branch-scoped, so a branch preview of the production app cannot exercise
   them, and making them early breaks the live site.
2. **Delete the SPA catch-all rewrite** (`/<*>` → `/index.html`, 200) under _App settings →
   Rewrites and redirects_. It exists so React Router could handle deep links, and it will swallow
   every Next route and 404.
3. Confirm the platform is `WEB_COMPUTE` and attach an IAM service role (required for compute; it
   also grants the CloudWatch Logs permissions for runtime logs).
4. Note the previous deployment ID first — rolling back means redeploying the pre-merge commit _and_
   restoring the SPA rewrite rule.
5. If the build runs out of memory, set `NODE_OPTIONS` as a console environment variable (not in
   `amplify.yml`) and temporarily drop `.next/cache/**/*` from `cache.paths`.

Afterwards, resubmit `https://everettgsm.com/sitemap.xml` in Search Console and spot-check a
few album URLs with the URL Inspection tool to confirm the new canonicals.
