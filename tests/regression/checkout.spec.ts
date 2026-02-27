import { expect, test } from '../../fixtures/test-fixtures';
import { PRODUCTS } from '../../test-data/products';
import { VALID_CUSTOMER, MINIMAL_CUSTOMER, INVALID_DATA, TEST_CARDS } from '../../test-data/checkout-data';


test.describe('Checkout Flow', () => {
  
  test.beforeEach(async ({ page, homePage, productPage,cartPage }) => {
    await homePage.goto();
    await homePage.openProductByName(PRODUCTS.GREY_JACKET.label);
    await productPage.addToCart();
    await expect(cartPage.cartCountElement).toContainText('(1)');
    await productPage.navigateToCart();
    
    await cartPage.proceedToCheckout();
  });
  for (const invalidEmail of INVALID_DATA.emails) {
    test(`shows error for invalid email: "${invalidEmail}"`, async ({ checkoutPage }) => {
      await checkoutPage.fillEmail(invalidEmail);
      
      await checkoutPage.fillShippingAddress({
        address: MINIMAL_CUSTOMER.address,
        city: MINIMAL_CUSTOMER.city,
        zipCode: MINIMAL_CUSTOMER.zipCode
      });
      
      await checkoutPage.submitPayment();
      
      await checkoutPage.expectEmailError();
    });
  }
  
  
  test('shows errors when required fields are empty', async ({ checkoutPage }) => {
    // Try to submit without filling anything
    await checkoutPage.submitPayment();
    
    // Check all required field errors
    await checkoutPage.expectAddressError();
    await checkoutPage.expectCityError();
    await checkoutPage.expectZipCodeError();
    
    // Optional: also check email if it's on the same page
    // await checkoutPage.expectEmailError();
  });
  
});