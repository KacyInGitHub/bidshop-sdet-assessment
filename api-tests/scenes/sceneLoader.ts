import { TestContext } from '../context/testContext';
import { ApiRegistry } from '../api/apiRegistry';
import { Scene, SceneClass } from './scene';

export type SceneRegistry = Record<string, Scene>;

export function createScenes(sceneClasses: readonly SceneClass[], apiRegistry: ApiRegistry, context: TestContext<any>): SceneRegistry {
  const scenes: SceneRegistry = {};

  for (const SceneClass of sceneClasses) {
    const key = SceneClass.key;

    if (scenes[key]) {
      throw new Error(
        `Duplicate scene key: "${key}"`
      );
    }

    const apiKey = SceneClass.api;

    if (apiKey) {
      const api = apiRegistry[apiKey as keyof ApiRegistry];

      if (!api) {
        throw new Error(
          `API "${apiKey}" required by scene "${key}" is not registered`
        );
      }

      scenes[key] = new SceneClass(api, context);
    } else {
      scenes[key] = new SceneClass(context);
    }
  }

  return scenes;
}