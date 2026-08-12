import { expect, test } from '@playwright/test';

/**
 * These assert the point of the Next.js migration: the metadata is in the HTML
 * the server sends, before any JavaScript runs. They fetch with `request`
 * rather than `page` so nothing hydrates — which is what a crawler sees.
 *
 * Under the old Vite SPA every one of these routes returned an identical head,
 * with a canonical pointing at the home page.
 *
 * Routes come from the live sitemap rather than from src/data, which keeps the
 * chain honest end to end: src/app/sitemap.test.ts proves the catalog reaches
 * the sitemap, and these prove every sitemap URL is a real prerendered page.
 * (Importing the catalog here is also not possible — it imports .jpg assets,
 * which Playwright's transpiler cannot parse.)
 */

const SITE = 'https://everettmcintire.com';

const tag = (html: string, pattern: RegExp) => html.match(pattern)?.[1];
const title = (html: string) => tag(html, /<title>([^<]*)<\/title>/);
const canonical = (html: string) => tag(html, /<link rel="canonical" href="([^"]*)"/);
const meta = (html: string, name: string) =>
  tag(html, new RegExp(`<meta name="${name}" content="([^"]*)"`)) ??
  tag(html, new RegExp(`<meta property="${name}" content="([^"]*)"`));

async function sitemapRoutes(request: {
  get: (url: string) => Promise<{ text(): Promise<string> }>;
}) {
  const xml = await (await request.get('/sitemap.xml')).text();
  return [...xml.matchAll(/<loc>([^<]*)<\/loc>/g)].map((match) =>
    match[1].replace(SITE, '').replace(/^$/, '/'),
  );
}

test('every sitemap route is prerendered with its own title, description, and self-canonical', async ({
  request,
}) => {
  const routes = await sitemapRoutes(request);
  expect(routes).toHaveLength(26);

  const seenTitles = new Map<string, string>();

  for (const route of routes) {
    const response = await request.get(route);
    expect(response.status(), `${route} status`).toBe(200);
    const html = await response.text();

    const pageTitle = title(html);
    expect(pageTitle, `${route} title`).toBeTruthy();
    expect(meta(html, 'description'), `${route} description`).toBeTruthy();

    // The canonical must point at this URL, not at the home page.
    const expected = route === '/' ? SITE : `${SITE}${route}`;
    expect(canonical(html), `${route} canonical`).toBe(expected);

    const duplicate = seenTitles.get(pageTitle!);
    expect(duplicate, `${route} shares a title with ${duplicate}`).toBeUndefined();
    seenTitles.set(pageTitle!, route);
  }
});

test('share cards differ per route and albums get a generated image', async ({ request }) => {
  const home = await (await request.get('/')).text();
  const album = await (await request.get('/photography/landscape/rockies2024')).text();

  expect(meta(home, 'og:title')).not.toBe(meta(album, 'og:title'));
  expect(meta(home, 'og:image')).not.toBe(meta(album, 'og:image'));
  expect(meta(album, 'og:image')).toContain('/photography/landscape/rockies2024/opengraph-image');
  expect(meta(album, 'twitter:card')).toBe('summary_large_image');

  const card = await request.get('/photography/landscape/rockies2024/opengraph-image');
  expect(card.status()).toBe(200);
  expect(card.headers()['content-type']).toContain('image/png');
});

test('album pages carry gallery and breadcrumb structured data', async ({ request }) => {
  const html = await (await request.get('/photography/landscape/rockies2024')).text();

  expect(html).toContain('"@type":"ImageGallery"');
  expect(html).toContain('"@type":"BreadcrumbList"');
  expect(html).toContain('"@type":"ImageObject"');
});

test('unknown photography URLs return 404 rather than 200 with not-found content', async ({
  request,
}) => {
  for (const route of ['/photography/nope', '/photography/landscape/not-a-real-album']) {
    const response = await request.get(route);
    expect(response.status(), `${route} status`).toBe(404);
    expect(await response.text()).toContain('This trail ends here.');
  }
});

test('single-album categories 301 their duplicate nested URL to the category', async ({
  request,
}) => {
  for (const category of ['animals', 'misc']) {
    // maxRedirects: 0, or Playwright follows the redirect and reports 200.
    const response = await request.get(`/photography/${category}/${category}`, {
      maxRedirects: 0,
    });

    expect(response.status(), `${category} status`).toBe(301);
    expect(response.headers().location).toBe(`/photography/${category}`);
  }
});

test('sitemap lists no redirecting URLs and covers every photograph', async ({ request }) => {
  const xml = await (await request.get('/sitemap.xml')).text();

  expect(xml).not.toContain(`${SITE}/photography/animals/animals`);
  expect(xml).not.toContain(`${SITE}/photography/misc/misc`);
  expect(xml.match(/<image:loc>/g) ?? []).toHaveLength(619);

  const robots = await request.get('/robots.txt');
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain(`Sitemap: ${SITE}/sitemap.xml`);
});
