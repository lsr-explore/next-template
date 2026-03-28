import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('Home page', () => {
  test('should render the heading and CTA links', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('A modern contact list');

    await expect(page.getByRole('link', { name: 'Sign in' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'View contacts' })).toBeVisible();
  });

  test('should display feature cards', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('Contact Management')).toBeVisible();
    await expect(page.getByText('Role-Based Access')).toBeVisible();
    await expect(page.getByText('Search & Filter')).toBeVisible();
  });

  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/');

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
});
