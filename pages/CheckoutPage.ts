import { Page, Locator } from '@playwright/test';
import { expect } from '../fixtures/test-fixtures';

export class CheckoutPage {
  //Contact section
  readonly email: Locator;
  // Delivery section
  readonly country: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly company: Locator
  readonly address: Locator;
  readonly houseNumber: Locator;
  readonly zipCode: Locator;
  readonly city: Locator;
  readonly state: Locator;
  readonly phone: Locator;
  //Payment section
  readonly cardNumber: Locator;
  readonly expiryDate: Locator;
  readonly cvv: Locator;
  readonly nameOnCard: Locator;
  readonly payNowButton: Locator;
  // Error messages
  readonly emailError: Locator;
  readonly addressError: Locator;
  readonly cityError: Locator;
  readonly zipCodeError: Locator;
  readonly cardNumberError: Locator;      
  readonly expiryDateError: Locator;
  readonly cvvError: Locator; 
  
  constructor(private page: Page) {
    this.email = page.getByPlaceholder('Email');
    this.country = page.locator('select[name="countryCode"]');
    this.firstName = page.getByPlaceholder('First name');
    this.lastName = page.getByPlaceholder('Last name');
    this.company = page.getByPlaceholder("Company (optional)")
    this.address = page.getByPlaceholder('Address');
    this.houseNumber= page.getByPlaceholder("Apartment, suite, etc. (optional)")
    this.zipCode = page.getByPlaceholder("Postal code");
    this.city = page.getByPlaceholder('City');
    this.state = page.locator('select[name="zone"]'); 
    this.phone = page.getByPlaceholder("Phone (optional)")
    this.cardNumber = page.getByPlaceholder('Card number');
    this.expiryDate = page.getByPlaceholder("Expiration date (MM / YY)");
    this.cvv = page.getByPlaceholder("Security code");
    this.nameOnCard = page.getByPlaceholder('Name on card');
    this.payNowButton = page.getByRole('button', { name: 'Pay now' });
    this.emailError = page.getByText("Enter a valid email");
    this.addressError = page.getByText(/enter an address/i);
    this.cityError = page.getByText(/enter a city/i);
    this.zipCodeError = page.getByText(/enter a ZIP.*postal code/i);
    this.cardNumberError = page.getByText(/enter a valid card number/i);
    this.expiryDateError = page.getByText(/enter a valid.*date|card.*expired/i);
    this.cvvError = page.getByText(/enter.*security code/i);

  }
  
  async fillEmail(email: string) {
    await this.email.fill(email);
  }
  
  async fillShippingAddress(data: {
  firstName?: string;
  lastName?: string;
  company?: string;
  country?: string;
  address: string;
  houseNumber?: string;
  city: string;
  state?: string;  // Optional - only for countries that need it
  zipCode: string;
  phone?: string;
}) {
  if (data.firstName) {
    await this.firstName.fill(data.firstName);
  }
  
  if (data.lastName) {
    await this.lastName.fill(data.lastName);
  }
  
  if (data.company) {
    await this.company.fill(data.company);
  }
  
  if (data.country) {
  // Set up listener for the country details API call
  const countryDetailsPromise = this.page.waitForResponse(
    response => response.url().includes('/checkouts/internal/graphql/persisted') 
              && response.url().includes('CountryDetails')
              && response.status() === 200
  );
  
  await this.country.selectOption({ label: data.country });
  await countryDetailsPromise;
}
  
  await this.address.fill(data.address);
  
  if (data.houseNumber) {
    await this.houseNumber.fill(data.houseNumber);
  }
  
  if (data.city) {
    await this.city.fill(data.city);
  }
  
  // Only fill state if it's provided AND visible
  if (data.state) {
    await this.state.selectOption({ label: data.state });
  }
  
  await this.zipCode.fill(data.zipCode);
  
  if (data.phone) {
    await this.phone.fill(data.phone);
  }
}

  async selectCountry(country: string) {
    await this.country.selectOption({ label: country });

  }
  
  async fillPaymentDetails(data: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  }) {
    await this.cardNumber.fill(data.cardNumber);
    await this.expiryDate.fill(data.expiryDate);
    await this.cvv.fill(data.cvv);
  }

  async submitPayment(){
    await this.payNowButton.click();
  }
  async expectEmailError() {
    await expect(this.emailError).toBeVisible();
    await expect(this.email).toHaveAttribute('aria-invalid', 'true');
  }
  
  async expectAddressError() {
    await expect(this.addressError).toBeVisible();
    await expect(this.address).toHaveAttribute('aria-invalid', 'true');
  }
  
  async expectCityError() {
    await expect(this.cityError).toBeVisible();
    await expect(this.city).toHaveAttribute('aria-invalid', 'true');
  }
  
  async expectZipCodeError() {
    await expect(this.zipCodeError).toBeVisible();
    await expect(this.zipCode).toHaveAttribute('aria-invalid', 'true');
  }
  
  async expectCardNumberError() {
    await expect(this.cardNumberError).toBeVisible();
    await expect(this.cardNumber).toHaveAttribute('aria-invalid', 'true');
  }
}