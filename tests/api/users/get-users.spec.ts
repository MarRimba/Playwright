import { expect, test } from "@playwright/test";

test.describe("GET /users", () => {
  const usersEndpoint = "/api/users";
  const expectedStatusCode = 200;
  const minimumUsersCount = 10;
  const expectedUserId = 4;

  type User = {
    id: number;
  };

  test("should return at least 10 users and status code 200", async ({
    request,
  }) => {
    // Arrange:

    // Act:
    const response = await request.get(usersEndpoint);

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
  });

  test("should return user with given id", async ({ request }) => {
    // Arrange:

    // Act:
    const response = await request.get(`${usersEndpoint}/${expectedUserId}`);

    // Assert:
    expect(
      response.status(),
      `For GET /users/{id} we expect status code ${expectedStatusCode}`,
    ).toBe(expectedStatusCode);

    const responseBody = (await response.json()) as User;

    expect(
      responseBody.id,
      `For id ${expectedUserId} we received: ${JSON.stringify(responseBody)}`,
    ).toBe(expectedUserId);
  });
});
