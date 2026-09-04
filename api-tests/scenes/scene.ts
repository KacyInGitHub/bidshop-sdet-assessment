export interface Scene {
  run(): Promise<void>;
}

export interface SceneClass {
  readonly key: string;
  readonly api?: string;

  new (...args: any[]): Scene;
}