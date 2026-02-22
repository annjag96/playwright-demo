import { expect, test } from '../../fixtures/test-fixtures';
import { PRODUCTS } from '../../test-data/products';

test('API + UI - Add to cart makes correct API call', async ({ page, homePage, productPage, cartPage }) => {
  const testProduct = PRODUCTS.NOIR_JACKET
  const cartApiPromise = page.waitForRequest(request => 
    request.url().includes('/cart/add.js') && 
    request.method() === 'POST'
  );
  
  
  await homePage.goto();
  await homePage.openProductByName(PRODUCTS.NOIR_JACKET.label);
  await productPage.addToCart();
  const cartApiRequest = await cartApiPromise;
  
  const payload = cartApiRequest.postDataJSON();
  expect(payload).toHaveProperty('id');
  expect(payload.id).toBe(testProduct.variantId); // Noir jacket variant ID
  
  
  const response = await cartApiRequest.response();
  const responseBody = await response?.json();
  expect(response?.status()).toBe(200);
  expect(responseBody.product_title).toBe('Noir jacket');
  expect(responseBody.quantity).toBeGreaterThan(0);
  await expect(cartPage.cartCountElement).toContainText('(1)');
});