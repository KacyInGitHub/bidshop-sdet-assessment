import { test, expect } from '@playwright/test';

import { AuthApi } from '../api/authApi';
import { ProductsApi } from '../api/productsApi';
import { RegisterUserScene } from '../scenes/registerUserScene';
import { FindAvailableProductScene } from '../scenes/findAvailableProductScene';
import { createPurchaseContext } from '../context/purchaseContext';
import { purchaseFlowData } from '../data/purchaseFlowData';

test(
  'customer can complete a purchase',
  async ({ request }) => {
    const context = createPurchaseContext(purchaseFlowData);

    const authApi = new AuthApi(request);

    const registerUserScene = new RegisterUserScene(authApi);

    const registeredUser = await registerUserScene.registerUser(context);

    expect(registeredUser.token).toBeTruthy();

    expect(registeredUser.user.id).toBeTruthy();

    expect(registeredUser.user.email).toBe(context.user.email);

    expect(registeredUser.user.name).toBe(context.user.name);

    const productsApi = new ProductsApi(request);

    const findAvailableProductScene = new FindAvailableProductScene(productsApi);

    await findAvailableProductScene.findAvailableProduct(context);
    
    expect(context.product.id).toBeTruthy();

    expect(context.product.name).toBeTruthy();

    expect(context.product.price).toBeGreaterThan(0);

    expect(context.product.originalStock).toBeGreaterThanOrEqual(context.product.quantity);

  }
);