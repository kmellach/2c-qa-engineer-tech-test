import { test, expect } from "../fixtures/fixtures";
import { AddBookPage } from "../page-objects/addBook.po";
import { bookBuilder } from "../test-data/books-Data";
import Ajv from "ajv";
import { Logger } from "../utils/logger";
import { bookSchema } from "../schema/book.schema";
import { BookDetailsPage } from "../page-objects/bookDetails.po";


test.describe('Add Book Flow using API', () => {
    test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  }
)

  test('Create a book via API and verify UI', async ({ request, page, bookDetailsPage }) => {
    const ajv = new Ajv();
    const validate = ajv.compile(bookSchema);

    const book = bookBuilder();

    const response = await request.post('/api/books', { data: book });
    const createdBook = await response.json();

    const isValid = validate(createdBook);

    if (!isValid) {
      Logger.error("Schema validation failed", validate.errors);
    }

    expect(isValid).toBe(true);

    await page.goto(`/book/${createdBook.id}`);

    //Validate with input
    expect(createdBook.title).toBe(book.title);
    expect(createdBook.author).toBe(book.author);
    //Validate API with UI
    expect(await bookDetailsPage.getTextFromTitle()).toBe(book.title);
    expect(await bookDetailsPage.getTextFromAuthor()).toBe(`by ${book.author}`);
    expect(await bookDetailsPage.getTextFromDetailsFields('Description')).toBe(book.description);
    expect(await bookDetailsPage.getTextFromDetailsFields('ISBN')).toBe(book.isbn);
    expect(await bookDetailsPage.getTextFromDetailsFields('Published Year'))
      .toBe(String(book.publishedYear));
    expect(await bookDetailsPage.getTextFromDetailsFields('Genre'))
      .toBe(book.genre);
  });

  test('Open a book created by API and open the same on UI, click Add Another Book Navigation', async ({ request, page , addBookPage, bookDetailsPage}) => {
    const book = bookBuilder();

    const response = await request.post('/api/books', { data: book });
    const createdBook = await response.json();
    await page.goto(`/book/${createdBook.id}`);

    //Click Add Another Book button 

    await bookDetailsPage.clickAddAnotherBook();
    await Promise.all([
      page.waitForURL(/\/add-book$/)
    ]);

    await addBookPage.fillForm(book);
    await addBookPage.submit();
    await expect(page.getByText('Book Added Successfully')).toBeVisible();

  });


  test('Should show error when book API fails', async ({ page , addBookPage}) => {
    await page.route('/api/books/*', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Internal Server Error' })
      });
    });

    await page.goto('/book/123');
    await expect(page.getByText('Error')).toBeVisible();
    await expect(page.getByText('Failed to fetch book')).toBeVisible();
    //There is a back to library button on error page, clicking that
    await addBookPage.clickBackToLibrary();
    await expect(page).toHaveURL('/');
    await expect(page.getByText('Book Library')).toBeVisible();
  });

  test('should show error when book API fails', async ({ page }) => {
    await page.route('/api/books/*', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Internal Server Error' })
      });
    });

    await page.goto('/book/123');
    await expect(page.getByText('Error')).toBeVisible();
    await expect(page.getByText('Failed to fetch book')).toBeVisible();

  });

  test('should show loader while fetching book details', async ({ page }) => {
    await page.route('/api/books/*', async route => {
      // delay response
      await new Promise(res => setTimeout(res, 2000));

      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 1,
          title: 'Mock Book',
          author: 'Mock Author'
        })
      });
    });

    await page.goto('/book/1');

    // Loader visible
    await expect(page.getByText(/loading/i)).toBeVisible();

    // Loader disappears
    await expect(page.getByText(/loading/i)).toBeHidden();

    // Data appears
    await expect(page.getByText('Mock Book')).toBeVisible();
  });

  test('should handle empty book response gracefully', async ({ page }) => {
    await page.route('/api/books/*', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(null)
      });
    });

    await page.goto('/book/999');

    // UI fallback
    await expect(page.getByText(/not found|no data/i)).toBeVisible();
  });


});

test.describe('Responsive - Book Details Page', () => {
  let bookDetailsPage: BookDetailsPage;
  let addBookPage: AddBookPage;


  test.beforeEach(async ({ page }) => {
    addBookPage = new AddBookPage(page);

    bookDetailsPage = new BookDetailsPage(page);

    await page.goto('/');
  });

  test('should display book details properly on all devices', async ({ page, request }) => {
    const book = bookBuilder();
    const response = await request.post('/api/books', { data: book });
    const createdBook = await response.json();
    await page.goto(`/book/${createdBook.id}`);
    await page.waitForLoadState('networkidle')
    await page.waitForLoadState('load')
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.getByText(`by ${book.author}`)).toBeVisible();
    expect(await bookDetailsPage.isAddAnotherBookDisplayed()).toBeTruthy();
    expect(await bookDetailsPage.isBackButtonDisplayed()).toBeTruthy();
  });

});