import { Page, Locator } from '@playwright/test';
import type { Book } from '@/types/book';

export class AddBookPage {
  constructor(private page: Page) { }

  // Locators
  get titleInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Title *' });
  }

  get authorInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Author *' });
  }

  get genreDropdown(): Locator {
    return this.page.locator(`//select[@name = 'genre']`);
  }

  get publishedYearInput(): Locator {
    return this.page.getByRole('spinbutton', { name: 'Published Year' });
  }

  get pagesInput(): Locator {
    return this.page.getByRole('spinbutton', { name: 'Pages' });
  }

  get isbnInput(): Locator {
    return this.page.getByRole('textbox', { name: 'ISBN' });
  }

  get ratingInput(): Locator {
    return this.page.getByRole('spinbutton', { name: 'Rating (1-5)' });
  }

  get descriptionInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Description' });
  }

  get submitButton(): Locator {
    return this.page.getByRole('button', { name: 'Add Book' });
  }

  get cancelButton(): Locator {
  return this.page.getByRole('link', { name: 'Cancel' });
}

  get backToLibrary(): Locator {
  return this.page.getByRole('link', { name: 'Back to Library' });
}

  // Actions
  //Used conditional filling to support both positive and negative test scenarios using the same method.
  //No duplicate logic 
  //Here we donot have rating in the fields, but it still executes fail proof 

  async fillForm(book: Partial<Omit<Book, 'id'>>) {
    const fields = [
      { key: 'title', locator: this.titleInput },
      { key: 'author', locator: this.authorInput },
      { key: 'isbn', locator: this.isbnInput },
      { key: 'pages', locator: this.pagesInput },
      { key: 'description', locator: this.descriptionInput },
      { key: 'publishedYear', locator: this.publishedYearInput }
    ];

    for (const field of fields) {
      const value = book[field.key as keyof typeof book];
      if (value !== undefined) {
        await field.locator.fill(String(value));
      }
    }

    if (book.genre) await this.genreDropdown.selectOption(book.genre);
    if (book.publishedYear)
      await this.publishedYearInput.fill(book.publishedYear.toString());
     if (book.pages)
      await this.pagesInput.fill(book.pages.toString());
    if (book.rating)
      await this.ratingInput.fill(book.rating.toString());
  }

  async submit() {
    await this.submitButton.click();
  }

  async cancel(){
    await this.cancelButton.click();
  }

  async clickBackToLibrary(){
    await this.backToLibrary.click()
  }
}