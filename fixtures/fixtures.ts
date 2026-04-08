import { test as base } from '@playwright/test';
import { AddBookPage } from '../page-objects/addBook.po';
import { BookDetailsPage } from '../page-objects/bookDetails.po';
import { HomePage } from '../page-objects/homePage.po';

type Pages = {
  homePage: HomePage;
  addBookPage: AddBookPage;
  bookDetailsPage: BookDetailsPage;
};

export const test = base.extend<Pages>({
  page: async ({ page, request }, use) => {
    const response = await request.post('/api/test/reset');
    if (!response.ok()) {
      throw new Error(`Failed to reset test data: ${response.status()}`);
    }
    await use(page);
  },

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  addBookPage: async ({ page }, use) => {
    const addBookPage = new AddBookPage(page);
    await use(addBookPage);
  },

  bookDetailsPage: async ({ page }, use) => {
    const bookDetailsPage = new BookDetailsPage(page);
    await use(bookDetailsPage);
  },
});

export const expect = test.expect;
