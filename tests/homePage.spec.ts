import { test, expect } from '../fixtures/fixtures';
import { HomePage } from '../page-objects/homePage.po';

test.describe('Home Page Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('load');
    })

    test('should load homepage successfully', async ({ page, homePage }) => {
        expect(await homePage.getHeading()).toBe(`Book Library`);
        expect(await homePage.getsubHeading()).toBe(`Discover amazing books from various genres`)
    });

    test('should display Add New Book button', async ({ homePage }) => {
        await expect(homePage.addBook).toBeVisible();
    });

    test('should display list of books', async ({ page, homePage }) => {
        await expect(page.getByText('Loading books...')).toBeHidden();
        const count = await homePage.getCountOfBooks();

        for (let i = 0; i < count; i++) {
            await expect(homePage.bookCards.nth(i)).toBeVisible();
        }
        expect(count).toBeGreaterThan(0);
    });


    test('should navigate to Add Book page', async ({ page, homePage }) => {
        await homePage.goToAddBook();
        await expect(page).toHaveURL(/.*add/);
    });

    test('should navigate to book details page', async ({ page, homePage }) => {
        await homePage.clickFirstBookDetails();
        await expect(page).toHaveURL(/.*book/);
    });

    test('each book should have unique title', async ({ page, homePage }) => {
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
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');
    })

    test('should render homepage correctly on all devices', async ({ page, homePage }) => {
        await expect(page.getByText('Book Library')).toBeVisible();
        expect(await homePage.isAddBookVisible()).toBeTruthy();
    });

    test('should render properly on custom mobile viewport', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 }); // iPhone size

        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');

        await expect(page.getByText('Book Library')).toBeVisible();
    });

});
