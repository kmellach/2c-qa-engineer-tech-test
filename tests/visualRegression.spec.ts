import { test, expect } from '../fixtures/fixtures';

test.describe('Visual Regression', () => {

  test('Homepage snapshot', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Loading books...')).toBeHidden();
    await expect(page).toHaveScreenshot('screenshots/homepage.png', { fullPage: true });
  });

  test('Add Book page snapshot', async ({ page }) => {
    await page.goto('/add-book');
    await expect(page).toHaveScreenshot('screenshots/add-book.png', { fullPage: true });
  });

  test('Book Details snapshot', async ({ page, request }) => {
    const res = await request.post('/api/books', { data: { title: 'Visual Book', author: 'QA' } });
    const book = await res.json();

    await page.goto(`/book/${book.id}`);
    await expect(page).toHaveScreenshot('screenshots/book-details.png', { fullPage: true });
  });
});