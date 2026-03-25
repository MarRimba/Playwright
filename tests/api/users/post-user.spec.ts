import { expect, test } from "@playwright/test";
import { apiRequiredFieldCases, userPayload } from "./test-data/post-user.data";

test.describe("POST /users", () => {
  const usersEndpoint = "/api/users";
  const expectedCreatedStatusCode = 201;
  const expectedValidationErrorStatusCode = 422;
  const expectedFetchCreatedUserStatusCode = 200;
  const expectedMaskedValue = "****";

  test("should create valid and unique user", async ({ request }) => {
    // Arrange:

    // Act:
    const response = await request.post(usersEndpoint, {
      data: userPayload,
    });

    // Assert:
    expect(
      response.status(),
      `For POST api/users/ we expect status code ${expectedCreatedStatusCode}`,
    ).toBe(expectedCreatedStatusCode);

    const responseBody = await response.json();
    const responseWithUser = await request.get(`api/users/${responseBody.id}`);

    expect(
      responseWithUser.status(),
      `For GET api/users/{id} we expect status code ${expectedFetchCreatedUserStatusCode}`,
    ).toBe(expectedFetchCreatedUserStatusCode);

    const createdUser = await responseWithUser.json();

    expect(createdUser.id).toBe(responseBody.id);
    expect(createdUser.firstname).toBe(userPayload.firstname);
    expect(createdUser.avatar).toBe(userPayload.avatar);
    expect(createdUser.email).toBe(expectedMaskedValue);
    expect(createdUser.lastname).toBe(expectedMaskedValue);
    expect(createdUser.password).toBe(expectedMaskedValue);
  });

  for (const apiTestCase of apiRequiredFieldCases) {
    test(apiTestCase.testName, async ({ request }) => {
      // Arrange:
      const { testName: _testName, ...invalidPayload } = apiTestCase;

      // Act:
      const response = await request.post(usersEndpoint, {
        data: invalidPayload,
      });

      // Assert:
      expect(
        response.status(),
        `For POST api/users/ we expect status code ${expectedValidationErrorStatusCode}`,
      ).toBe(expectedValidationErrorStatusCode);
    });
  }
});
