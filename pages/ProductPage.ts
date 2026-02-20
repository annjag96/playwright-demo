import { Locator, Page } from '@playwright/test';

export class ProductPage {
  readonly addToCartButton: Locator;
  constructor(private page: Page) {
    this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
  }

  async  addToCart() {
    await this.addToCartButton.click();
  }
  async waitForAjax() {
  await this.page.waitForResponse(response =>
    response.url().includes('/cart/add') && response.status() === 200
  );
}

async goToCart() {
    await this.page.getByText("My Cart ").first().click();
  }
}
