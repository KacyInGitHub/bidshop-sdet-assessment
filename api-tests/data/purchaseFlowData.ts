import { TestContext } from '../context/testContext';

export const purchaseFlowData: TestContext = {
  user: {
    name: 'E2E Test User',
    password: 'Password123!'
  },

  product: {
    quantity: 2
  },

  cart: {},

  order: {
    customer: {
      name: 'E2E Test Customer',
      address: '1 Queen Street',
      city: 'Auckland',
      postcode: '1010'
    }
  }
};