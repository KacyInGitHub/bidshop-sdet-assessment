import { test as base } from '@playwright/test';

import { TestContext, createTestContext } from '../context/testContext';

import { purchaseFlowData, PurchaseFlowData } from '../data/purchaseFlowData';

import { createApiRegistry } from '../api/apiRegistry';
import { createScenes, SceneRegistry } from '../scenes/sceneLoader';

import { sceneClasses } from '../scenes/sceneRegistry';

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