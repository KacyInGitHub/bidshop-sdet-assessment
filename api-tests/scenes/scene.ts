export interface Scene {
  run(): Promise<void>;
}

export interface SceneClass {
  readonly key: string;
  readonly apis?: readonly string[];

  new (...args: any[]): Scene;
}