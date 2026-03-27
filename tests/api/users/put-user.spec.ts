import { expect, test } from "@playwright/test";
import {
  apiPutUserRequiredFieldCases,
  patchUserPayload,
  userIds,
} from "./test-data/user.data";
import { API_ENDPOINTS } from "../config/api-endpoints";
import { API_HEADERS } from "../config/api-headers";

test.describe("PUT /users/{id}", () => {
  const expectedValidationErrorStatusCode = 422;
  const expectedFetchCreatedUserStatusCode = 200;
  const expectedMaskedValue = "****";

  test(
    "should update all given user data",
    { tag: ["@users", "@putUser"] },
    async ({ request }) => {
      // Arrange:

      // Act:
      const response = await request.put(
        `${API_ENDPOINTS.USERS}/${userIds.userIdToPut}`,
        { headers: API_HEADERS.AUTHORIZED(), data: patchUserPayload },
      );

      // Assert:
      expect(
        response.status(),
        `For PUT api/users/{id} we expect status code ${expectedFetchCreatedUserStatusCode}`,
      ).toBe(expectedFetchCreatedUserStatusCode);

      const responseBody = await response.json();
      const responseWithUser = await request.get(
        `api/users/${responseBody.id}`,
      );

      expect(
        responseWithUser.status(),
        `For GET api/users/{id} we expect status code ${expectedFetchCreatedUserStatusCode}`,
      ).toBe(expectedFetchCreatedUserStatusCode);

      const createdUser = await responseWithUser.json();

      expect(createdUser.id).toBe(responseBody.id);
      expect(createdUser.firstname).toBe(patchUserPayload.firstname);
      expect(createdUser.avatar).toBe(patchUserPayload.avatar);
      expect(createdUser.email).toBe(expectedMaskedValue);
      expect(createdUser.lastname).toBe(expectedMaskedValue);
      expect(createdUser.password).toBe(expectedMaskedValue);
    },
  );

  // Negative test cases
  for (const apiTestCase of apiPutUserRequiredFieldCases) {
    test(
      apiTestCase.testName,
      { tag: ["@users", "@putUser"] },
      async ({ request }) => {
        // Arrange:
        const { testName: _testName, ...invalidPayload } = apiTestCase;

        // Act:
        const response = await request.put(
          `${API_ENDPOINTS.USERS}/${userIds.userIdToPut}`,
          { headers: API_HEADERS.AUTHORIZED(), data: invalidPayload },
        );

        // Assert:
        expect(
          response.status(),
          `For PUT api/users/{id} we expect status code ${expectedValidationErrorStatusCode}`,
        ).toBe(expectedValidationErrorStatusCode);
      },
    );
  }
});
