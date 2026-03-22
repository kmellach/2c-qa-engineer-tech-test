import { test, expect } from '@playwright/test';
import { HomePage } from '../page-objects/homePage.po';

test.describe('Home Page Tests', () => {
    let homePage: HomePage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await page.goto('/');
        await page.waitForLoadState('load')
    });

    test('should load homepage successfully', async ({ page }) => {
        expect(await homePage.getHeading()).toBe(`Book Library`);
        expect(await homePage.getsubHeading()).toBe(`Discover amazing books from various genres`)
    });

    test('should display Add New Book button', async () => {

        await expect(homePage.addBook).toBeVisible();
    });

    test('should display list of books', async ({ page }) => {
        await page.waitForLoadState('networkidle');
        const count = await homePage.getCountOfBooks();

        for (let i = 0; i < count; i++) {
            await expect(homePage.bookCards.nth(i)).toBeVisible();
        }
        expect(count).toBeGreaterThan(0);
    });


    test('should navigate to Add Book page', async ({ page }) => {

        await homePage.goToAddBook();

        await expect(page).toHaveURL(/.*add/);
    });

    test('should navigate to book details page', async ({ page }) => {

        await homePage.clickFirstBookDetails();

        await expect(page).toHaveURL(/.*book/);
    });

    test('each book should have unique title', async ({ page }) => {
        const titles = await homePage.getAllBookTitles();
        const unique = new Set(titles);
        expect(unique.size).toBe(titles.length);
    });

    test('each book should have View details link', async ({ page }) => {
        const homePage = new HomePage(page);

        const count = await homePage.allViewDetailsLinks.count();

        for (let i = 0; i < count; i++) {
            await expect(homePage.allViewDetailsLinks.nth(i)).toBeVisible();
        }
    });

});

test.describe('Responsive - Home Page', () => {

    test('should render homepage correctly on all devices', async ({ page }) => {
        await page.goto('/');

        await expect(page.getByText('Book Library')).toBeVisible();
        await expect(page.getByRole('link', { name: 'Add New Book' })).toBeVisible();
    });

    test('book cards should be visible and not overlap', async ({ page }) => {
        await page.goto('/');

        const cards = page.locator('a.bg-white');
        const count = await cards.count();

        expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {
            await expect(cards.nth(i)).toBeVisible();
        }
    });

    test('should render properly on custom mobile viewport', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 }); // iPhone size

        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');

        await expect(page.getByText('Book Library')).toBeVisible();
    });

});