import { Page, Locator } from '@playwright/test';

export class BookDetailsPage {
  constructor(private page: Page) {}

  // Locators

  get title(): Locator {
    return this.page.locator(`//h1[contains(@class, 'text-3xl')]`);
  }

  get author(): Locator {
    return this.page.locator(`//p[contains(@class, 'text-xl')]`)
  }


  get backButton(): Locator {
    return this.page.getByRole('link', { name: 'Back to Library',exact:true });
  }

  get addAnotherBook(): Locator {
    return this.page.getByRole('link',  { name: 'Add Another Book' });
  }

  //Parametrization Helpers 

  
  async fieldsOnDetailsPage(field: string) {
    return this.page.locator(`//h3[contains(text(), '${field}')]/..//p`)
  }

    // Actions -- text content methods for Assertions 

  async getTextFromTitle(){
    return await this.title.textContent();
  }

  
  async getTextFromAuthor(){
    return await this.author.textContent();
  }

    async getTextFromDetailsFields(field: string){
    return (await this.fieldsOnDetailsPage(field)).textContent();
  }

  async clickAddAnotherBook(){
    await Promise.all([
      this.page.waitForURL(/\/add-book$/),
      this.addAnotherBook.click(),
    ]);
  }

  async isBackButtonDisplayed(){
return await this.backButton.isVisible();
  }

  async isAddAnotherBookDisplayed(){
return await this.addAnotherBook.isVisible();
  }

}


