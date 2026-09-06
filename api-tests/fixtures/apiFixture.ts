import { test as base } from "@playwright/test";

import { TestContext, createTestContext } from "../context/testContext";

import { createApiRegistry } from "../api/apiRegistry";
import { createScenes, SceneRegistry } from "../scenes/sceneLoader";

import { sceneClasses } from "../scenes/sceneRegistry";

type ApiFixture = {
  testData: unknown;
  testContext: TestContext;
  scenes: SceneRegistry;
};

/**
 * Extends Playwright's base test with the framework-specific fixtures.
 *
 * Each test gets its own TestContext and a registry of fully constructed
 * Scenes. Cases only need to define test data and execute business Scenes;
 * dependency creation and wiring are handled here.
 */

export const test = base.extend<ApiFixture>({
  // Allows each case to provide its own static test data through test.use().
  testData: [{}, { option: true }],

  testContext: async ({ testData }, use) => {
    const testContext = createTestContext(testData);
    await use(testContext);
  },

  scenes: async ({ request, testContext }, use) => {
    const apiRegistry = createApiRegistry(request);
    const scenes = createScenes(sceneClasses, apiRegistry, testContext);
    await use(scenes);
  },
});
