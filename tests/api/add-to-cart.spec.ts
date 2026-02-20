import { expect, test } from '../../fixtures/test-fixtures';
import { PRODUCTS } from '../../test-data/products';

test('API + UI - Add to cart makes correct API call', async ({ page, homePage, productPage, cartPage }) => {
  // Set up API request listener BEFORE the action
  const cartApiPromise = page.waitForRequest(request => 
    request.url().includes('/cart/add.js') && 
    request.method() === 'POST'
  );
  
  // Perform the action
  await homePage.goto();
  await homePage.openProductByName(PRODUCTS.NOIR_JACKET.label);
  await productPage.addToCart();
  
  // Wait for and capture the API request
  const cartApiRequest = await cartApiPromise;
  
  // ✅ Verify API request payload
  const payload = cartApiRequest.postDataJSON();
  expect(payload).toHaveProperty('id');
  expect(payload.id).toBe('611952521'); // Noir jacket variant ID
  
  // ✅ Verify API response
  const response = await cartApiRequest.response();
  const responseBody = await response?.json();
  
  expect(response?.status()).toBe(200);
  expect(responseBody.product_title).toBe('Noir jacket');
  expect(responseBody.quantity).toBeGreaterThan(0);
  
  // ✅ Verify UI updated
  await expect(cartPage.cartCountElement).toContainText('(1)');
});