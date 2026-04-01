import { expect, test } from "@playwright/test";
import { apiRequiredFieldCases, userPayload } from "./test-data/user.data";
import { API_ENDPOINTS } from "../config/api-endpoints";
import { API_STATUS_CODES } from "../config/api-status-codes";
import { TAG, tags } from "../../config/test-tags";

test.describe("POST /users", () => {
  const expectedMaskedValue = "****";

  test(
    "should create valid and unique user",
    { tag: tags(TAG.API, TAG.USERS, TAG.POST_USER) },
    async ({ request }) => {
      // Arrange:

      // Act:
      const response = await request.post(API_ENDPOINTS.USERS, {
        data: userPayload,
      });

      // Assert:
      expect(
        response.status(),
        `For POST api/users/ we expect status code ${API_STATUS_CODES.CREATED}`,
      ).toBe(API_STATUS_CODES.CREATED);

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
      expect(createdUser.firstname).toBe(userPayload.firstname);
      expect(createdUser.avatar).toBe(userPayload.avatar);
      expect(createdUser.email).toBe(expectedMaskedValue);
      expect(createdUser.lastname).toBe(expectedMaskedValue);
      expect(createdUser.password).toBe(expectedMaskedValue);
    },
  );

  // Negative test cases
  for (const apiTestCase of apiRequiredFieldCases) {
    test(
      apiTestCase.testName,
      { tag: tags(TAG.API, TAG.USERS, TAG.POST_USER) },
      async ({ request }) => {
        // Arrange:
        const { testName: _testName, ...invalidPayload } = apiTestCase;

        // Act:
        const response = await request.post(API_ENDPOINTS.USERS, {
          data: invalidPayload,
        });

        // Assert:
        expect(
          response.status(),
          `For POST api/users/ we expect status code ${API_STATUS_CODES.UNPROCESSABLE_ENTITY}`,
        ).toBe(API_STATUS_CODES.UNPROCESSABLE_ENTITY);
      },
    );
  }
});
