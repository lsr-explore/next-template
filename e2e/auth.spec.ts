import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('Authentication', () => {
  test('should show login page with preset accounts', async ({ page }) => {
    await page.goto('/login');

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Sign in');
    await expect(page.getByText('viewer@example.com')).toBeVisible();
    await expect(page.getByText('editor@example.com')).toBeVisible();
  });

  test('should login as viewer and redirect to contacts', async ({ page }) => {
    await page.goto('/login');

    await page.getByLabel('Email').fill('viewer@example.com');
    await page.getByLabel('Password').fill('ContactsViewer123');
    await page.getByRole('main').getByRole('button', { name: 'Sign in' }).click();

    await page.waitForURL('/contacts');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Contacts');
  });

  test('should login as editor and see add contact button', async ({ page }) => {
    await page.goto('/login');

    await page.getByLabel('Email').fill('editor@example.com');
    await page.getByLabel('Password').fill('ContactsEditor123');
    await page.getByRole('main').getByRole('button', { name: 'Sign in' }).click();

    await page.waitForURL('/contacts');
    await expect(page.getByRole('link', { name: 'Add contact' })).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.getByLabel('Email').fill('wrong@example.com');
    await page.getByLabel('Password').fill('wrongpassword');
    await page.getByRole('main').getByRole('button', { name: 'Sign in' }).click();

    await expect(page.getByRole('main').getByRole('alert')).toContainText(
      'Invalid email or password',
    );
  });

  test('should redirect unauthenticated users to login', async ({ page }) => {
    await page.goto('/contacts');

    await page.waitForURL('/login');
  });

  test('login page should have no accessibility violations', async ({ page }) => {
    await page.goto('/login');

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
});
