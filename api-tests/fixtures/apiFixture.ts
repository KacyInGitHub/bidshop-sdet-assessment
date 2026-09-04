import { test as base } from '@playwright/test';

import { TestContext, createTestContext } from '../context/testContext';

import { createApiRegistry } from '../api/apiRegistry';
import { createScenes, SceneRegistry } from '../scenes/sceneLoader';

import { sceneClasses } from '../scenes/sceneRegistry';

type ApiFixture = {
  testData: unknown;
  testContext: TestContext;
  scenes: SceneRegistry;
};

export const test =
  base.extend<ApiFixture>({
    testData: [{},{option: true}],

    testContext: async ({ testData }, use) => {
      const testContext = createTestContext(testData);
      await use(testContext);
    },

    scenes: async ({ request, testContext }, use) => {
      const apiRegistry = createApiRegistry(request);
      const scenes = createScenes(sceneClasses, apiRegistry, testContext);
      await use(scenes);
    }

  });