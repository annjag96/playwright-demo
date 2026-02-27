export const VALID_CUSTOMER = {
  email: 'test@example.com',
  firstName: 'John',
  lastName: 'Doe',
  company: 'Test Corp',
  address: '123 Main Street',
  houseNumber: 'Apt 4B',
  zipCode: '00-001',
  city: 'Warsaw',
  phone: '+48 123 456 789'
} as const;

export const MINIMAL_CUSTOMER = {
  email: 'minimal@example.com',
  address: '456 Test Ave',
  zipCode: '02-002',
  city: 'Krakow'
} as const;

export const INVALID_DATA = {
  emails: [
    'notanemail',
    '@example.com',
    'test@',
    ' ',
  ],
  emptyFields: {
    email: '',
    address: '',
    zipCode: '',
    city: ''
  }
} as const;

export const TEST_CARDS = {
  VALID_VISA: {
    number: '4242 4242 4242 4242',
    expiry: '12/28',
    cvv: '123'
  },
  INVALID_NUMBER: {
    number: '1234 5678 9012 3456',
    expiry: '12/28',
    cvv: '123'
  },
  EXPIRED: {
    number: '4242 4242 4242 4242',
    expiry: '01/20',
    cvv: '123'
  }
} as const;