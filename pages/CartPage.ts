import { Page, expect } from '@playwright/test';

export class CartPage {
  public readonly cartCountElement;
  public readonly myCart;
  public readonly emptyCart;
  public readonly proceedToCheckoutButton;
  constructor(private page: Page) {
   //
   // Find the main cart element semantically
    //this.myCart = page.getByText('My Cart ');
    this.myCart = page.locator(".cart").getByText('My Cart ');
    // Then scope down to the count
    this.cartCountElement = this.myCart.locator('.count.cart-target');
    this.emptyCart = page.locator('p.empty').getByText('Your cart is empty.');
    this.proceedToCheckoutButton = page.locator('#checkout');
  }

  async getCartCount(): Promise<number> {
  const text = await this.cartCountElement.innerText(); 
  const number = parseInt(text.replace(/[()]/g, '').trim()); 
  return number; 
}

async waitForCartUpdate(previousCount: number) {
  const expectedCount = previousCount + 1;
  //const cartCountElement = await this.page.locator('.count.cart-target')
  await expect(await this.cartCountElement).toContainText(`(${expectedCount})`);
  // Or if you want the full text: await expect(this.cartCountElement).toHaveText(`My Cart(${expectedCount})`);
}
async clickMyCart(){
  await this.myCart.first().click();
}

async proceedToCheckout (){
  await this.proceedToCheckoutButton.click()
}

}
