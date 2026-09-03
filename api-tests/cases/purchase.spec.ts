import { test, expect } from '@playwright/test';

import { AuthApi } from '../api/authApi';
import { AuthScene } from '../scenes/authScene';
import {
  createPurchaseContext
} from '../context/purchaseContext';
import {
  purchaseFlowData
} from '../data/purchaseFlowData';

test(
  'customer can complete a purchase',
  async ({ request }) => {
    const context =
      createPurchaseContext(purchaseFlowData);

    const authApi =
      new AuthApi(request);

    const authScene =
      new AuthScene(authApi);

    const registeredUser =
      await authScene.registerUser(context);

    expect(registeredUser.token).toBeTruthy();

    expect(registeredUser.user.id).toBeTruthy();

    expect(registeredUser.user.email)
      .toBe(context.user.email);

    expect(registeredUser.user.name)
      .toBe(context.user.name);
  }
);