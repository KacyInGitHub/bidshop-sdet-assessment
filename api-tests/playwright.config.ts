import { defineConfig } from "@playwright/test";
import { getEnvironmentConfig } from "./config/environments";

const environment = getEnvironmentConfig();
export default defineConfig({
  testDir: "./suites",

  use: {
    baseURL: environment.apiBaseUrl,
  },

  reporter: [
    [
      "html",
      {
        outputFolder: "playwright-report",
        open: "never",
      },
    ],
  ],
});
