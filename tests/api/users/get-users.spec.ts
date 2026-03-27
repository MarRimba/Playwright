import { expect, test } from "@playwright/test";
import { API_ENDPOINTS } from "../config/api-endpoints";
import { API_STATUS_CODES } from "../config/api-status-codes";

test.describe("GET /users", () => {
  const minimumUsersCount = 10;

  type User = {
    id: number;
  };

  let allUsers: User[] = [];

  test.beforeAll(async ({ request }) => {
    const response = await request.get(API_ENDPOINTS.USERS);
    allUsers = (await response.json()) as User[];
  });

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
        `For GET /users we expect status code: ${API_STATUS_CODES.OK}`,
      ).toBe(API_STATUS_CODES.OK);

      expect(
        Array.isArray(allUsers),
        "GET /users should return an array of users",
      ).toBe(true);

      expect(
        allUsers.length,
        `We expect number of users to be at least ${minimumUsersCount}`,
      ).toBeGreaterThanOrEqual(minimumUsersCount);
    },
  );

  test(
    "should return randomly selected user from users list",
    { tag: ["@users", "@getUsers"] },
    async ({ request }) => {
      // Arrange:
      const randomUser = allUsers[Math.floor(Math.random() * allUsers.length)];

      // Act:
      const response = await request.get(
        `${API_ENDPOINTS.USERS}/${randomUser.id}`,
      );

      // Assert:
      expect(
        response.status(),
        `For GET /users/${randomUser.id} we expect status code ${API_STATUS_CODES.OK}`,
      ).toBe(API_STATUS_CODES.OK);

      const responseBody = (await response.json()) as User;

      expect(
        responseBody.id,
        `Expected id ${randomUser.id}, received: ${JSON.stringify(responseBody)}`,
      ).toBe(randomUser.id);
    },
  );
});
