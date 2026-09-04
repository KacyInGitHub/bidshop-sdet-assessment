import { test as base } from '@playwright/test';

import {
  TestContext,
  createTestContext
} from '../context/testContext';

import {
  purchaseFlowData,
  PurchaseFlowData
} from '../data/purchaseFlowData';

import { createApiRegistry } from '../infrastructure/apiRegistry';
import {
  createScenes,
  SceneRegistry
} from '../infrastructure/sceneLoader';

import { RegisterUserScene } from '../scenes/registerUserScene';
import { FindAvailableProductScene } from '../scenes/findAvailableProductScene';
import { AddProductToCartScene } from '../scenes/addProductToCartScene';
import { PlaceOrderScene } from '../scenes/placeOrderScene';
import { GetCartScene } from '../scenes/getCartScene';
import { GetProductScene } from '../scenes/getProductScene';
import { GetOrderScene } from '../scenes/getOrderScene';
import { VerifyRegisteredUserScene } from '../scenes/verifyRegisteredUserScene';

const sceneClasses = [
  RegisterUserScene,
  FindAvailableProductScene,
  AddProductToCartScene,
  PlaceOrderScene,
  GetCartScene,
  GetProductScene,
  GetOrderScene,
  VerifyRegisteredUserScene
];

type ApiFixture = {
  testContext: TestContext<PurchaseFlowData>;
  scenes: SceneRegistry;
};

export const test = base.extend<ApiFixture>({
  testContext: async ({}, use) => {
    const testContext = createTestContext(purchaseFlowData);
    await use(testContext);
  },

  scenes: async ({ request, testContext },use) => {
    const apiRegistry = createApiRegistry(request);
    const scenes = createScenes(sceneClasses, apiRegistry, testContext);
    await use(scenes);
  }
});