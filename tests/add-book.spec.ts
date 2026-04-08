import { test, expect } from '../fixtures/fixtures';
import { bookBuilder, invalidBooks } from '../test-data/books-Data';
import { errorMessages } from '../errorMessages';
import { validateErrorMessage } from '../utils/errorMessageValidation';

test.describe('Add Book Flow', () => {

    test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

  });

  test('User can add a new book successfully', async ({  homePage, addBookPage, page  }) => {
    const book = bookBuilder();

    await homePage.goToAddBook();
    await addBookPage.fillForm(book);
    await addBookPage.submit();
    await expect(page.getByText('Book Added Successfully')).toBeVisible();
    await page.waitForURL(/\/book\/\d+/, { timeout: 10000 });
    await expect(page.getByText(book.title)).toBeVisible();
  });

  test('Should show validation error when required fields are missing', async ({ homePage, addBookPage }) => {
    await homePage.goToAddBook();

    await addBookPage.fillForm(invalidBooks.emptyFields);
    await addBookPage.submit();

    const message = await addBookPage.titleInput.evaluate(
      (el: HTMLInputElement) => el.validationMessage
    );

    expect(message.toLowerCase()).toContain(errorMessages.title.required);
  });

  test('Should allow adding book with only required fields', async ({ homePage, addBookPage, page  }) => {
    const book = {
      title: 'Minimal Book',
      author: 'Test Author',
      pages: 12
    };
    //We can add like this or we can put up in the book builder. Just showing the possibilities
    await homePage.goToAddBook();
    await addBookPage.fillForm(book);
    await addBookPage.submit();
    await expect(page.getByText('Book Added Successfully')).toBeVisible();
    await page.waitForURL(/\/book\/\d+/, { timeout: 10000 });
    await expect(page.getByText(book.title)).toBeVisible();
  });

  test('should show validation error when published year is less than 1000', async ({ homePage, addBookPage }) => {
    const invalidBook = bookBuilder(invalidBooks.invalidPublishedYear);

    await homePage.goToAddBook();
    await addBookPage.fillForm(invalidBook);
    await addBookPage.submit();

    const message = await addBookPage.publishedYearInput.evaluate(
      (el: HTMLInputElement) => el.validationMessage
    );

    expect(
      validateErrorMessage(message, errorMessages.publishedYear.min)
    ).toBeTruthy();
  });

  test('Should show error for invalid rating', async ({ homePage, addBookPage }) => {
    const book = bookBuilder(invalidBooks.invalidRating);

    await homePage.goToAddBook();
    await addBookPage.fillForm(book);
    await addBookPage.submit();

    const message = await addBookPage.ratingInput.evaluate(
      (el: HTMLInputElement) => el.validationMessage
    );
    expect(
      validateErrorMessage(message, errorMessages.rating.invalid)
    ).toBeTruthy();
  });


  test('Form should retain entered values after validation error', async ({ homePage, addBookPage }) => {
    const book = bookBuilder();

    await homePage.goToAddBook();

    await addBookPage.fillForm({
      ...book,
      title: ''
    });

    await addBookPage.submit();

    await expect(addBookPage.authorInput).toHaveValue(book.author);
  });

  test('Should show correct validation message when pages is 0', async ({ homePage, addBookPage }) => {
    const invalidBook = bookBuilder(invalidBooks.invalidPages);

    await homePage.goToAddBook();
    await addBookPage.fillForm(invalidBook);
    await addBookPage.submit();

    const message = await addBookPage.pagesInput.evaluate(
      (el: HTMLInputElement) => el.validationMessage
    );

    expect(
      validateErrorMessage(message, errorMessages.pages.min)
    ).toBeTruthy();
  });

  test('should navigate to home page on clicking Cancel after filling form', async ({ homePage, addBookPage, page }) => {
    const book = bookBuilder();

    await homePage.goToAddBook();
    await addBookPage.fillForm(book);
    await addBookPage.cancel();
    await expect(page).toHaveURL('/');
    await expect(page.getByText('Book Library')).toBeVisible();
  });

  test('should navigate to home page on clicking Back to Library after filling form', async ({ homePage, addBookPage, page }) => {
    await homePage.goToAddBook();
    await addBookPage.clickBackToLibrary();
    await expect(page).toHaveURL('/');
    await expect(page.getByText('Book Library')).toBeVisible();
  });

});


test.describe('Responsive - Add Book Page', () => {
//we can pick locators from the po as well. Just showing possibilities
  test('form should be usable on all screen sizes', async ({ page }) => {
    await page.goto('/add-book');

    await expect(page.getByRole('textbox', { name: 'Title *' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Author *' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add Book' })).toBeVisible();
  });

  test('should allow scrolling on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/add-book');

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    await expect.poll(async () => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
    await expect(page.getByRole('button', { name: 'Add Book' })).toBeVisible();
  });

});
