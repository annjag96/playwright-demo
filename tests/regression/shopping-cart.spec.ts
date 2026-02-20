import { expect, test } from '../../fixtures/test-fixtures';
import { PRODUCTS } from '../../test-data/products';


test('cart count increases', async ({ homePage, productPage, cartPage }) => {
  await homePage.goto();
  const before = await cartPage.getCartCount();

  await homePage.openFirstProduct();
    await productPage.addToCart() 

await expect(cartPage.cartCountElement).toContainText(`(${before + 1})`);
    //await cartPage.waitForCartUpdate(before);
});

test('cart drawer', async ({homePage, productPage, cartPage}) => {
  await homePage.goto();
  await cartPage.clickMyCart()
  await expect(cartPage.emptyCart).toBeVisible();
  await cartPage.clickMyCart() //close cart drawer
  await homePage.openProductByName(PRODUCTS.GREY_JACKET.label)
  await productPage.addToCart();
});

test('Cart persistence - Add item, refresh page, cart count still shows', async ({page, homePage, productPage, cartPage}) => {
await homePage.goto()
homePage.openProductByName(PRODUCTS.GREY_JACKET.label) 
await productPage.addToCart();
await expect(cartPage.cartCountElement).toContainText('(1)'); //ensure item was added
await page.reload();
await expect(cartPage.cartCountElement).toContainText('(1)');
});


test('Product browsing - Verify all 3 products display with correct name and price', async ({homePage}) => {
  await homePage.goto()
  await homePage.checkProductPrice(PRODUCTS.GREY_JACKET.label, PRODUCTS.GREY_JACKET.price)
    for (const product of Object.values(PRODUCTS)) {
    await homePage.checkProductPrice(product.label, product.price);
  }
});





