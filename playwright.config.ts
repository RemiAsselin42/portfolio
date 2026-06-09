import { defineConfig } from '@playwright/test';

// E2E + audits a11y (axe). Lance `npm run build` puis `npm run test:e2e`.
export default defineConfig({
  testDir: './tests/e2e',
  testMatch: '**/*.spec.ts',
  use: {
    baseURL: 'http://localhost:4321',
  },
  webServer: {
    command: 'npm run preview',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
