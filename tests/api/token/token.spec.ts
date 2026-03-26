import { test, expect } from "@playwright/test";
import { API_ENDPOINTS } from "../config/api-endpoints";

test.describe("GET /login", () => {
  test(
    "should verify generated token is valid",
    { tag: ["@auth"] },
    async ({ request }) => {
      const token = process.env.BEARER_TOKEN;

      const response = await request.get(API_ENDPOINTS.LOGIN, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      expect(response.ok()).toBeTruthy();
    },
  );
});
