import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

import { albumWithPhotographs } from './albums';

const routes = [
  ['/', 'I build products that stay useful after the demo.'],
  ['/projects', 'From first schema to final store submission.'],
  ['/about', 'Ownership, curiosity, and work that earns its complexity.'],
  ['/photography', 'Places, people, and the moments between plans.'],
] as const;

for (const [route, heading] of routes) {
  test(`${route} has a clear page heading and no horizontal overflow`, async ({ page }) => {
    await page.goto(route);

    await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible();
    await expect(page.locator('h1')).toHaveCount(1);
    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(hasHorizontalOverflow).toBe(false);
  });
}

test('core pages have no automatically detectable accessibility violations', async ({ page }) => {
  for (const [route] of routes) {
    await page.goto(route);
    await page.locator('h1').waitFor();
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations, `${route} accessibility violations`).toEqual([]);
  }
});

test('primary navigation, theme persistence, and invalid routes work', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Work' }).first().click();
  await expect(page).toHaveURL(/\/projects$/);

  await page.getByRole('button', { name: 'Use dark theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

  await page.goto('/photography/not-a-category/not-an-album');
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: "The journey doesn't end here. 404 is just another path, one that we all must take.",
    }),
  ).toBeVisible();
});

test('client-side navigation moves focus to the main landmark', async ({ page }) => {
  // Guards RouteFocus, the one behavior kept from the deleted RouteEffects.
  // Without it, keyboard and screen-reader users stay on the activated link after navigating.
  await page.goto('/');
  await page.getByRole('link', { name: 'Work' }).first().click();
  await expect(page).toHaveURL(/\/projects$/);

  await expect(page.locator('#main-content')).toBeFocused();
});

test('mobile navigation manages state and keyboard dismissal', async ({ page }) => {
  await page.setViewportSize({ height: 800, width: 375 });
  await page.goto('/');

  const menuButton = page.locator('button[aria-controls="mobile-navigation"]');
  await expect(menuButton).toHaveAccessibleName('Open navigation menu');
  await menuButton.click();
  await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  await expect(menuButton).toHaveAccessibleName('Close navigation menu');
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeHidden();
  await expect(menuButton).toBeFocused();
});

test('a gallery opens and closes an accessible viewer', async ({ page, request }) => {
  await page.goto(await albumWithPhotographs(request));

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.getByRole('button', { name: /photograph 1 of \d+/i }).click();
  await expect(page.getByRole('dialog', { name: /image viewer/i })).toBeVisible();
  await expect(page.getByText(/^1 \//)).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toBeHidden();
});

// Guards the jumping: tiles used to grow from nothing as their images arrived,
// and the columns rebalanced around each one. Relies on the bucket having
// recorded sizes (npm run photos:optimize) — without them this fails, rightly.
test('photographs load in without moving the grid', async ({ page, request }) => {
  // Hold every thumbnail back until the grid has been measured without them.
  let openGate = () => {};
  const gate = new Promise<void>((resolve) => {
    openGate = resolve;
  });
  await page.route('**/_next/image**', async (route) => {
    await gate;
    await route.continue();
  });

  await page.goto(await albumWithPhotographs(request));
  // Attached, not visible: an unsized tile is zero-height until its image lands.
  await expect(page.locator('.photo-grid__button').first()).toBeAttached();
  await page.evaluate(() => document.fonts.ready);

  // Relative to the grid, so nothing above it can move a tile in the reading.
  const layout = () =>
    page.locator('.photo-grid').evaluate((grid) => {
      const origin = grid.getBoundingClientRect();
      return [...grid.querySelectorAll('.photo-grid__button')].map((tile) => {
        const box = tile.getBoundingClientRect();
        return [box.x - origin.x, box.y - origin.y, box.width, box.height];
      });
    });
  const before = await layout();

  openGate();
  // A few in view is enough to have moved things; the album may hold fewer.
  await expect
    .poll(() =>
      page.locator('.photo-grid img').evaluateAll((images) => {
        const loaded = images.filter((image) => (image as HTMLImageElement).naturalWidth > 0);
        return loaded.length >= Math.min(4, images.length);
      }),
    )
    .toBe(true);

  expect(await layout()).toEqual(before);
});
