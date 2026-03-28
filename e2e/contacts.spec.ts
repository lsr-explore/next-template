import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const loginAsEditor = async (page: import('@playwright/test').Page) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('editor@example.com');
  await page.getByLabel('Password').fill('editor123');
  await page.getByRole('main').getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL('/contacts');
};

const loginAsViewer = async (page: import('@playwright/test').Page) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('viewer@example.com');
  await page.getByLabel('Password').fill('viewer123');
  await page.getByRole('main').getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL('/contacts');
};

test.describe('Contact list', () => {
  test('should display contacts after login', async ({ page }) => {
    await loginAsViewer(page);

    await expect(page.getByText('Maria Santos')).toBeVisible();
    await expect(page.getByText('James Chen')).toBeVisible();
  });

  test('should search contacts', async ({ page }) => {
    await loginAsViewer(page);

    await page.getByLabel('Search contacts').fill('Maria');
    await page.getByLabel('Search contacts').press('Enter');

    await expect(page.getByText('Maria Santos')).toBeVisible();
    await expect(page.getByText('James Chen')).not.toBeVisible();
  });

  test('viewer should not see add/edit/delete controls', async ({ page }) => {
    await loginAsViewer(page);

    await expect(page.getByRole('link', { name: 'Add contact' })).not.toBeVisible();
    await expect(page.getByRole('button', { name: 'Delete' }).first()).not.toBeVisible();
    await expect(page.getByRole('link', { name: 'Edit' }).first()).not.toBeVisible();
  });

  test('editor should see add/edit/delete controls', async ({ page }) => {
    await loginAsEditor(page);

    await expect(page.getByRole('link', { name: 'Add contact' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Delete' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Edit' }).first()).toBeVisible();
  });

  test('should expand and collapse notes', async ({ page }) => {
    await loginAsViewer(page);

    // Maria Santos has notes
    const notesButton = page.getByRole('button', { name: 'Notes' }).first();
    await notesButton.click();

    await expect(page.getByText('Product designer with expertise')).toBeVisible();

    await notesButton.click();
    await expect(page.getByText('Product designer with expertise')).not.toBeVisible();
  });

  test('contacts page should have no accessibility violations', async ({ page }) => {
    await loginAsViewer(page);

    // Wait for contacts to be fully rendered before scanning
    await expect(page.getByText('Maria Santos')).toBeVisible();

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
});
