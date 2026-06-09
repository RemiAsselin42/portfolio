import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test("le titre h1 'Rémi Asselin' est présent", async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('heading', { level: 1, name: 'Rémi Asselin' }),
  ).toBeVisible();
});

test('aucune violation a11y critique/grave (axe)', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  const blocking = results.violations.filter((v) =>
    ['critical', 'serious'].includes(v.impact ?? ''),
  );
  expect(blocking).toEqual([]);
});
