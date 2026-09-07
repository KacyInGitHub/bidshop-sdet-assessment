export interface EnvironmentConfig {
  apiBaseUrl: string;
}

const environments: Record<string, EnvironmentConfig> = {
  local: {
    apiBaseUrl: "http://localhost:4000",
  },
};

export function getEnvironmentConfig(): EnvironmentConfig {
  const environment = process.env.TEST_ENV ?? "local";

  const config = environments[environment];

  if (!config) {
    throw new Error(`Unknown test environment "${environment}".`);
  }

  let apiBaseUrl = config.apiBaseUrl;

  if (process.env.API_BASE_URL) {
    apiBaseUrl = process.env.API_BASE_URL;
  }

  return {
    apiBaseUrl: apiBaseUrl,
  };
}
