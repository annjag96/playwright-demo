import { Locator, Page } from '@playwright/test';

export class ProductPage {
  readonly addToCartButton: Locator;
  readonly checkOutButton: Locator
  constructor(private page: Page) {
    this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
    this.checkOutButton = page.getByText("Check Out")
  }

  async  addToCart() {
    await this.addToCartButton.click();
  }
  
async goToCart() {
    await this.page.getByText("My Cart ").first().click();
  }
  async navigateToCart() {
    await this.checkOutButton.click()
  }
}


