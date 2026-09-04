export type DeepReadonly<T> =
  T extends (...args: any[]) => any
    ? T
    : T extends object
      ? {
          readonly [K in keyof T]:
            DeepReadonly<T[K]>;
        }
      : T;

export interface TestContext<TStaticData = unknown> {
  readonly staticData: DeepReadonly<TStaticData>;

  dynamicData: Record<string, unknown>;
}

export function createTestContext<TStaticData>(
  staticData: TStaticData
): TestContext<TStaticData> {
  return {
    staticData: structuredClone(staticData) as DeepReadonly<TStaticData>,
    dynamicData: {}
  };
}

export function setDynamicData<T>(
  context: TestContext,
  key: string,
  value: T
): void {
  context.dynamicData[key] = value;
}

export function getDynamicData<T>(
  context: TestContext,
  key: string
): T {
  const value = context.dynamicData[key];

  if (value === undefined) {
    throw new Error(
      `Dynamic data "${key}" is missing`
    );
  }

  return value as T;
}