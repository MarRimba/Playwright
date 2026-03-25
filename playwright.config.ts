import "dotenv/config";
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 1,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    // testIdAttribute: 'pw-test'
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      testMatch: "tests/users/**/*.spec.ts",
    },
    {
      name: "api",
      use: {},
      testMatch: "tests/api/**/*.spec.ts",
    },
  ],
});
