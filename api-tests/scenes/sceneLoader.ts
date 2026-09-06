import { TestContext } from "../context/testContext";
import { ApiRegistry } from "../api/apiRegistry";
import { Scene, SceneClass } from "./scene";

export type SceneRegistry = Record<string, Scene>;

export function createScenes(
  sceneClasses: readonly SceneClass[],
  apiRegistry: ApiRegistry,
  context: TestContext,
): SceneRegistry {
  const scenes: SceneRegistry = {};

  for (const SceneClass of sceneClasses) {
    const key = SceneClass.key;

    if (scenes[key]) {
      throw new Error(`Duplicate scene key: "${key}"`);
    }

    const apiKeys = SceneClass.apis ?? [];

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

    scenes[key] = new SceneClass(apiDependencies, context);
  }

  return scenes;
}
