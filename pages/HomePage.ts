import { expect, Locator, Page } from '@playwright/test';
import { link } from 'node:fs';

export class HomePage {
  readonly demoString: Locator 
  constructor(private page: Page) {
    this.demoString = page.locator('[id="tagline"]').filter({hasText:"Just a demo site showing off what Sauce can do."})
  }

  async goto() {
    await this.page.goto('https://sauce-demo.myshopify.com/');
  }
  async openProductByName(name:string) {
    await this.page.getByRole('link', {name}).click();
  }

  async openFirstProduct() {
    await this.page.getByRole('link', { name: 'Grey jacket' }).click()
  }

  async checkProductPrice(product: string, price: string) {
  const productLink = this.page.getByRole('link', { name: product });
  
  // Check the link itself is visible
  await expect(productLink).toBeVisible();
  
  // Check that this link contains the price text
  await expect(productLink).toContainText(price);
}
}
