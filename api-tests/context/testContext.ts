export interface TestContext {
  // Predefined test data provided by the case. It should remain unchanged during execution.
  readonly staticData: unknown;

  // Runtime data produced and shared between Scenes during the test flow.
  dynamicData: Record<string, unknown>;
}

/**
 * Creates an isolated Context for each test.
 *
 * Static data is deep cloned to avoid modifying the original case data,
 * while dynamic data starts empty and is populated during execution.
 */
export function createTestContext(staticData: unknown): TestContext {
  return {
    staticData: structuredClone(staticData),
    dynamicData: {},
  };
}

export function setDynamicData<T>(
  context: TestContext,
  key: string,
  value: T,
): void {
  context.dynamicData[key] = value;
}

export function getDynamicData<T>(context: TestContext, key: string): T {
  const value = context.dynamicData[key];

  if (value === undefined) {
    throw new Error(`Dynamic data "${key}" is missing`);
  }

  return value as T;
}

export function getStaticData<T>(testContext: TestContext, path: string): T {
  const parts = path.split(".");

  let current: unknown = testContext.staticData;

  for (const part of parts) {
    if (typeof current !== "object" || current === null || !(part in current)) {
      throw new Error(`Static data "${path}" is missing`);
    }

    current = (current as Record<string, unknown>)[part];
  }

  return current as T;
}
