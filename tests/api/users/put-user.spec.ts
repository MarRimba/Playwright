import { expect, test } from "@playwright/test";
import {
  apiPutUserRequiredFieldCases,
  patchUserPayload,
  userIds,
} from "./test-data/user.data";
import { API_ENDPOINTS } from "../config/api-endpoints";
import { API_HEADERS } from "../config/api-headers";
import { API_STATUS_CODES } from "../config/api-status-codes";
import { TAG, tags } from "../../config/test-tags";

test.describe("PUT /users/{id}", () => {
  const expectedMaskedValue = "****";

  test(
    "should update all given user data",
    { tag: tags(TAG.API, TAG.USERS, TAG.PUT_USER) },
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
        `For PUT api/users/{id} we expect status code ${API_STATUS_CODES.OK}`,
      ).toBe(API_STATUS_CODES.OK);

      const responseBody = await response.json();
      const responseWithUser = await request.get(
        `api/users/${responseBody.id}`,
      );

      expect(
        responseWithUser.status(),
        `For GET api/users/{id} we expect status code ${API_STATUS_CODES.OK}`,
      ).toBe(API_STATUS_CODES.OK);

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
      { tag: tags(TAG.API, TAG.USERS, TAG.PUT_USER) },
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
          `For PUT api/users/{id} we expect status code ${API_STATUS_CODES.UNPROCESSABLE_ENTITY}`,
        ).toBe(API_STATUS_CODES.UNPROCESSABLE_ENTITY);
      },
    );
  }
});
