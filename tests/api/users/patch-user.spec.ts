import { expect, test } from "@playwright/test";
import { API_ENDPOINTS, API_STATUS_CODES } from "../../config/api-constants";
import { API_HEADERS } from "../../config/api-headers";
import { userPayload, userIds } from "./test-data/user.data";
import { TAG, tags } from "../../config/test-tags";

test.describe("PATCH /users", () => {
  const patchUserPayload = {
    firstname: userPayload.firstname,
  };

  test(
    "user first name should be updated",
    { tag: tags(TAG.API, TAG.USERS, TAG.PATCH_USER) },
    async ({ request }) => {
      // Arrange:
      const responseBeforePatch = await request.get(
        `${API_ENDPOINTS.USERS}/${userIds.userIdToPatch}`,
      );
      const responseBeforePatchBody = await responseBeforePatch.json();

      // Act:

      const response = await request.patch(
        `${API_ENDPOINTS.USERS}/${userIds.userIdToPatch}`,
        { headers: API_HEADERS.AUTHORIZED(), data: patchUserPayload },
      );

      // Assert:
      const updatedUser = await request.get(
        `${API_ENDPOINTS.USERS}/${userIds.userIdToPatch}`,
      );
      const updatedUserBody = await updatedUser.json();

      expect(responseBeforePatchBody.firstname).not.toBe(
        updatedUserBody.firstname,
      );

      expect(response.status()).toEqual(API_STATUS_CODES.OK);
      expect(updatedUser.status()).toEqual(API_STATUS_CODES.OK);
    },
  );
});
