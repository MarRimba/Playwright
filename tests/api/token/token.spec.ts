import { test, expect } from "@playwright/test";

test.describe("GET /login", () => {
  test("should verify generated token is valid",{ tag: ["@auth"] },  async ({ request }) => {
    const token = process.env.BEARER_TOKEN;

    const response = await request.get("api/login", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    expect(response.ok()).toBeTruthy();
  });
});
