import { TestContext } from "../context/testContext";
import { ApiRegistry } from "../api/apiRegistry";
import { Scene, SceneClass } from "./scene";

export type SceneRegistry = Record<string, Scene>;

/**
 * Creates Scene instances and resolves their declared API dependencies.
 *
 * Each Scene declares the APIs it requires through its static `apis` metadata.
 * The loader resolves those API instances from the ApiRegistry and injects them,
 * together with the test-scoped Context, into the Scene constructor.
 */
export function createScenes(
  sceneClasses: readonly SceneClass[],
  apiRegistry: ApiRegistry,
  context: TestContext,
): SceneRegistry {
  const scenes: SceneRegistry = {};

  for (const SceneClass of sceneClasses) {
    const key = SceneClass.key;

    // Fail fast rather than silently overwriting an existing Scene.
    if (scenes[key]) {
      throw new Error(`Duplicate scene key: "${key}"`);
    }

    const apiKeys = SceneClass.apis ?? [];

    // Scenes without API dependencies only require the test Context.
    if (apiKeys.length === 0) {
      scenes[key] = new SceneClass(context);

      continue;
    }

    const apiDependencies: Record<string, unknown> = {};

    for (const apiKey of apiKeys) {
      const api = apiRegistry[apiKey as keyof ApiRegistry];

      if (!api) {
        throw new Error(
          `API "${apiKey}" required by scene "${key}" is not registered`,
        );
      }

      apiDependencies[apiKey] = api;
    }

    // Instantiate the Scene with its resolved APIs and test-scoped Context.
    scenes[key] = new SceneClass(apiDependencies, context);
  }

  return scenes;
}
