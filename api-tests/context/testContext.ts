import { Cart } from '../api/cartApi';
import { Order } from '../api/ordersApi';
import { Product } from '../api/productsApi';

export interface TestContext {
  user: {
    name: string;
    password: string;
    email?: string;
    id?: string;
    token?: string;
  };

  product: {
    quantity: number;
    id?: string;
    name?: string;
    price?: number;
    originalStock?: number;
    latest?: Product;
  };

  cart: {
    latest?: Cart;
  };

  order: {
    customer: {
      name: string;
      email?: string;
      address: string;
      city: string;
      postcode: string;
    };
    id?: string;
    latest?: Order;
  };
}

export function createTestContext(data: TestContext): TestContext {
  return structuredClone(data);
}