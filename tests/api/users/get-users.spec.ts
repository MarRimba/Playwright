import { expect, test } from "@playwright/test";
import { userIds } from "./test-data/user.data";
import { API_ENDPOINTS } from "../config/api-endpoints";

test.describe("GET /users", () => {
  const expectedStatusCode = 200;
  const minimumUsersCount = 10;

  type User = {
    id: number;
  };

  test(
    "should return at least 10 users and status code 200",
    { tag: ["@smoke", "@users", "@getUsers"] },
    async ({ request }) => {
      // Arrange:

      // Act:
      const response = await request.get(API_ENDPOINTS.USERS);

      // Assert:
      expect(
        response.status(),
        `For GET /users we expect status code: ${expectedStatusCode}`,
      ).toBe(expectedStatusCode);

      const responseBody = (await response.json()) as User[];

      expect(
        Array.isArray(responseBody),
        "GET /users should return an array of users",
      ).toBe(true);

      expect(
        responseBody.length,
        `We expect number of users to be at least ${minimumUsersCount}`,
      ).toBeGreaterThanOrEqual(minimumUsersCount);
    },
  );

  test(
    "should return user with given id",
    { tag: ["@users", "@getUsers"] },
    async ({ request }) => {
      // Arrange:

      // Act:
      const response = await request.get(
        `${API_ENDPOINTS.USERS}/${userIds.userIdToGet}`,
      );

      // Assert:
      expect(
        response.status(),
        `For GET /users/{id} we expect status code ${expectedStatusCode}`,
      ).toBe(expectedStatusCode);

      const responseBody = (await response.json()) as User;

      expect(
        responseBody.id,
        `For id ${userIds.userIdToGet} we received: ${JSON.stringify(responseBody)}`,
      ).toBe(userIds.userIdToGet);
    },
  );
});
