import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('Home page', () => {
  test('should render the heading and key links', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'To get started, edit the page.tsx file.',
    );

    await expect(page.getByRole('link', { name: 'Documentation' })).toBeVisible();

    await expect(page.getByRole('link', { name: 'Deploy Now' })).toBeVisible();
  });

  test('should display the Next.js logo', async ({ page }) => {
    await page.goto('/');

    const logo = page.getByRole('img', { name: 'Next.js logo' });
    await expect(logo).toBeVisible();
  });

  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/');

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
});
