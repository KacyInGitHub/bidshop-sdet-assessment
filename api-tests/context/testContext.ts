export interface TestContext {
  readonly staticData: unknown;
  dynamicData: Record<string, unknown>;
}

export function createTestContext(
  staticData: unknown
): TestContext {
  return {
    staticData: structuredClone(staticData),
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

export function getStaticData<T>(
  context: TestContext,
  path: string
): T {
  const parts = path.split('.');

  let current: unknown =
    context.staticData;

  for (const part of parts) {
    if (
      typeof current !== 'object' ||
      current === null ||
      !(part in current)
    ) {
      throw new Error(
        `Static data "${path}" is missing`
      );
    }

    current =
      (
        current as Record<string, unknown>
      )[part];
  }

  return current as T;
}