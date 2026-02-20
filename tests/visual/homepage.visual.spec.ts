import { expect, test } from '../../fixtures/test-fixtures';

test.describe('Homepage Visual Tests', () => {
  test('desktop layout', async ({ page, homePage }) => { 
    await homePage.goto();
    await expect(page).toHaveScreenshot('homePage.png')
   });
});

test.describe('Product Page Visual Tests', () => {
  test('product details', async ({ page, homePage }) => { 
    await homePage.goto();
    await homePage.openFirstProduct();
  
  // Visual snapshot of the product page
    await expect(page).toHaveScreenshot('product-page.png', {
     mask: [homePage.demoString]
  });
   });
  test('add to cart button states', async ({ page }) => { 
    //  todo
   });
});

test.describe('Cart Visual Tests',  () => {
  test('empty cart icon', async ({ homePage, cartPage }) => { 
    await homePage.goto();
    await expect(cartPage.cartCountElement).toHaveScreenshot('empty-cart.png');
   });
test('empty cart drawer', async({homePage, cartPage}) => {
    await homePage.goto()
    await cartPage.clickMyCart()
    await expect(cartPage.emptyCart).toHaveScreenshot('empty-cart-drawer.png')
});
  test('cart with items', async ({homePage, productPage, cartPage}) => { 
    await homePage.goto();
    await homePage.openFirstProduct();
    await productPage.addToCart();
    await expect(cartPage.cartCountElement).toHaveScreenshot('cart-with-item.png');

   });
});
