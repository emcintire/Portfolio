import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

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

  await page.goto('/photography/landscape/not-a-real-album');
  await expect(
    page.getByRole('heading', { level: 1, name: 'This trail ends here.' }),
  ).toBeVisible();
});

test('client-side navigation moves focus to the main landmark', async ({ page }) => {
  // Guards RouteFocus, the one behavior kept from the deleted RouteEffects.
  // Without it, keyboard and screen-reader users stay on the activated link
  // after navigating.
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

// Rockies has 26 photographs, so it straddles the 24-per-page boundary. The
// album this previously used, Adirondacks, holds 22 — under the page size — so
// it rendered every photograph at once and never showed a "Load more" button.
test('gallery progressively loads and opens an accessible viewer', async ({ page }) => {
  await page.goto('/photography/landscape/rockies2024');

  await expect(page.getByRole('heading', { level: 1, name: 'Rockies' })).toBeVisible();
  await expect(page.locator('.photo-grid > li')).toHaveCount(24);
  await page.getByRole('button', { name: /photograph 1 of 26/i }).click();
  await expect(page.getByRole('dialog', { name: /Rockies image viewer/i })).toBeVisible();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByText(/2 \//)).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toBeHidden();

  await page.getByRole('button', { name: 'Load more photographs' }).click();
  await expect(page.locator('.photo-grid > li')).toHaveCount(26);
});
