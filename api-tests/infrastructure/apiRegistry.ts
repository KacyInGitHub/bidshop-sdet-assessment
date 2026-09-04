import { APIRequestContext } from '@playwright/test';

import { AuthApi } from '../api/authApi';
import { ProductsApi } from '../api/productsApi';
import { CartApi } from '../api/cartApi';
import { OrdersApi } from '../api/ordersApi';

export function createApiRegistry(request: APIRequestContext) {
  return {
    auth: new AuthApi(request),
    products: new ProductsApi(request),
    cart: new CartApi(request),
    orders: new OrdersApi(request)
  };
}

export type ApiRegistry =
  ReturnType<typeof createApiRegistry>;