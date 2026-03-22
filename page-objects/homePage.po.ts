import { Page, Locator } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) { }

  //Locators -- used getter methods for Encapsulation

  get addBook(): Locator {
    return this.page.getByRole('link', { name: 'Add New Book' });
  }

  get allViewDetailsLinks(): Locator {
    return this.page.getByRole('link', { name: 'View details' });
  }

  get bookCards(): Locator {
    return this.page.locator(`//a[contains(@class , 'bg-white rounded-lg shadow-md')]`);
  }

  get heading(): Locator {
    return this.page.locator(`//h1`)
  }

  get subHeading(): Locator {
    return this.page.locator(`//p[contains(@class , 'mt-2')]`)
  }

  // Dynamic locator 
  bookDetailsLinkByTitle(title: string): Locator {
    return this.page.locator(`//h3[text()='${title}']/..//a[contains(text(),'View details')]`);
  }

  //Actions

  async goToAddBook() {
    await this.addBook.click();
  }

  async clickFirstBookDetails() {
    await this.allViewDetailsLinks.first().click();
  }

  async clickBookDetailsByTitle(title: string) {
    await this.bookDetailsLinkByTitle(title).click();
  }

  async getAllBookTitles(): Promise<string[]> {
    return this.page.locator('h3').allTextContents();
  }

  async getHeading() {
    return this.heading.textContent();
  }

  async getCountOfBooks() {
    return this.bookCards.count();
  }

  async getsubHeading() {
    return this.subHeading.textContent();
  }

}