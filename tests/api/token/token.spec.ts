import { test, expect } from "@playwright/test";
import { API_ENDPOINTS } from "../../../src/config/api-constants";
import { TAG, tags } from "../../../src/config/test-tags";

test.describe("GET /login", () => {
  test(
    "should verify generated token is valid",
    { tag: tags(TAG.API, TAG.AUTH, TAG.TOKEN) },
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
