import { expect, test } from "@playwright/test";
import {
  API_ENDPOINTS,
  API_STATUS_CODES,
} from "../../../src/config/api-constants";
import { TAG, tags } from "../../../src/config/test-tags";

test.describe("GET /users", () => {
  type User = {
    id: number;
  };

  test(
    "should return all users from database",
    { tag: tags(TAG.API, TAG.SMOKE, TAG.USERS, TAG.GET_USERS) },
    async ({ request }) => {
      // Arrange:

      // Act:
      const usersResponse = await request.get(API_ENDPOINTS.USERS);
      const responseBody = (await usersResponse.json()) as User[];

      // Assert:
      expect(
        usersResponse.status(),
        `For GET /users we expect status code: ${API_STATUS_CODES.OK}`,
      ).toBe(API_STATUS_CODES.OK);

      expect(
        Array.isArray(responseBody),
        "Expected response body to be an array",
      ).toBeTruthy();
      expect(
        responseBody.length,
        "Expected users list to contain at least one user",
      ).toBeGreaterThan(0);
    },
  );

  test(
    "should return randomly selected user from users list",
    { tag: tags(TAG.API, TAG.USERS, TAG.GET_USERS) },
    async ({ request }) => {
      // Arrange:
      const usersResponse = await request.get(API_ENDPOINTS.USERS);
      const allUsers = (await usersResponse.json()) as User[];
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
