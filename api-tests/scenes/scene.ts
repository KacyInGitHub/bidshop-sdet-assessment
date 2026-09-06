/**
 * Represents a runnable business scene.
 *
 * A scene performs a reusable business action, query, or verification within a test case.
 */
export interface Scene {
  run(): Promise<void>;
}
/**
 * Defines the metadata and constructor contract for a Scene implementation.
 *
 * `key` uniquely identifies the scene in the registry.
 * `apis` declares the API dependencies required by the scene.
 * The constructor is used by the scene loader to create the scene with its resolved dependencies.
 */
export interface SceneClass {
  readonly key: string;
  readonly apis?: readonly string[];

  new (...args: any[]): Scene;
}
