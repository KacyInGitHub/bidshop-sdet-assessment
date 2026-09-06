import { APIRequestContext } from "@playwright/test";

import { AuthApi } from "./authApi";
import { ProductsApi } from "./productsApi";
import { CartApi } from "./cartApi";
import { OrdersApi } from "./ordersApi";

export function createApiRegistry(request: APIRequestContext) {
  return {
    auth: new AuthApi(request),
    products: new ProductsApi(request),
    cart: new CartApi(request),
    orders: new OrdersApi(request),
  };
}

// Derive the registry type from the factory function to avoid maintaining the structure separately.
export type ApiRegistry = ReturnType<typeof createApiRegistry>;
