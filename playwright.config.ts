import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  expect: {
    timeout: 10_000,
  },
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never' }]],
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://127.0.0.1:4173',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  webServer: {
    // Serve the production build, not the dev server: prerendered HTML and real
    // 404 statuses are exactly what these tests assert.
    command: 'npm run build && npm run start -- -H 127.0.0.1 -p 4173',
    reuseExistingServer: !process.env.CI,
    // Generous because the command includes a cold `next build`.
    timeout: 420_000,
    url: 'http://127.0.0.1:4173',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chromium',
      use: { ...devices['Pixel 7'] },
    },
  ],
});
