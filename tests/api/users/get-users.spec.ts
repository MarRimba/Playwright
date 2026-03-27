import { expect, test } from "@playwright/test";
import { API_ENDPOINTS } from "../config/api-endpoints";
import { API_STATUS_CODES } from "../config/api-status-codes";

test.describe("GET /users", () => {
  type User = {
    id: number;
  };

  let allUsers: User[] = [];

  test.beforeAll(async ({ request }) => {
    const response = await request.get(API_ENDPOINTS.USERS);
    allUsers = (await response.json()) as User[];
  });

  test(
    "should return all users from database",
    { tag: ["@smoke", "@users", "@getUsers"] },
    async ({ request }) => {
      // Arrange:

      // Act:
      const response = await request.get(API_ENDPOINTS.USERS);
      const responseBody = (await response.json()) as User[];

      // Assert:
      expect(
        response.status(),
        `For GET /users we expect status code: ${API_STATUS_CODES.OK}`,
      ).toBe(API_STATUS_CODES.OK);

      expect(
        responseBody.length,
        `Expected all ${allUsers.length} users, received: ${responseBody.length}`,
      ).toBe(allUsers.length);
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
