import { expect, test } from '@playwright/test';

import { albumWithPhotographs } from './albums';

const SITE = 'https://everettgsm.com';

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
  expect(routes).toEqual(expect.arrayContaining(['/', '/projects', '/about', '/photography']));

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
  const path = await albumWithPhotographs(request);
  const home = await (await request.get('/')).text();
  const album = await (await request.get(path)).text();

  expect(meta(home, 'og:title')).not.toBe(meta(album, 'og:title'));
  expect(meta(home, 'og:image')).not.toBe(meta(album, 'og:image'));
  expect(meta(album, 'og:image')).toContain(`${path}/opengraph-image`);
  expect(meta(album, 'twitter:card')).toBe('summary_large_image');

  const card = await request.get(`${path}/opengraph-image`);
  expect(card.status()).toBe(200);
  expect(card.headers()['content-type']).toContain('image/png');
});

test('album pages carry gallery and breadcrumb structured data', async ({ request }) => {
  const html = await (await request.get(await albumWithPhotographs(request))).text();

  expect(html).toContain('"@type":"ImageGallery"');
  expect(html).toContain('"@type":"BreadcrumbList"');
  expect(html).toContain('"@type":"ImageObject"');
});

test('unknown photography URLs return 404 rather than 200 with not-found content', async ({
  request,
}) => {
  for (const route of ['/photography/nope', '/photography/nope/not-a-real-album']) {
    const response = await request.get(route);
    expect(response.status(), `${route} status`).toBe(404);
    expect(await response.text()).toContain(
      "The journey doesn't end here. 404 is just another path, one that we all must take.",
    );
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

test('the old landscape URLs 301 to their travel equivalents', async ({ request }) => {
  // The rule matches on the path alone, so the album need not exist.
  for (const suffix of ['', '/any-album', '/any-album/opengraph-image']) {
    const response = await request.get(`/photography/landscape${suffix}`, { maxRedirects: 0 });

    expect(response.status(), `landscape${suffix} status`).toBe(301);
    expect(response.headers().location).toBe(`/photography/travel${suffix}`);
  }
});

test('sitemap lists no redirecting URLs and includes photographs', async ({ request }) => {
  const xml = await (await request.get('/sitemap.xml')).text();

  expect(xml).not.toContain(`${SITE}/photography/animals/animals`);
  expect(xml).not.toContain(`${SITE}/photography/misc/misc`);
  expect(xml).not.toContain(`${SITE}/photography/landscape`);
  expect(xml).toContain('<image:loc>');

  const robots = await request.get('/robots.txt');
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain(`Sitemap: ${SITE}/sitemap.xml`);
});
