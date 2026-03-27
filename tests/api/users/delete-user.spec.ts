import { expect, test } from "@playwright/test";
import { API_ENDPOINTS } from "../config/api-endpoints";
import { API_STATUS_CODES } from "../config/api-status-codes";
import { userPayload } from "./test-data/user.data";

test.describe("DELETE /users", () => {
  test(
    "should create new and unique user for delete test",
    { tag: ["@users", "@deleteUser"] },
    async ({ request }) => {
      // Arrange:
      const createdUser = await request.post(API_ENDPOINTS.USERS, {
        data: userPayload,
      });

      const createdUserBody = await createdUser.json();

      const getCreatedUserBody = await request.get(
        `${API_ENDPOINTS.USERS}/${createdUserBody.id}`,
      );
      const getCreatedUser = await getCreatedUserBody.json();

      expect(createdUserBody.id).toEqual(getCreatedUser.id);

      const loginResponse = await request.post(API_ENDPOINTS.LOGIN, {
        data: {
          email: userPayload.email,
          password: userPayload.password,
        },
      });
      const { access_token: bearerToken } = await loginResponse.json();

      // Act:
      const deletedUser = await request.delete(
        `${API_ENDPOINTS.USERS}/${createdUserBody.id}`,
        { headers: { Authorization: `Bearer ${bearerToken}` } },
      );

      // Assert:
      expect(deletedUser.status()).toBe(API_STATUS_CODES.OK);

      const getDeletedUser = await request.get(
        `${API_ENDPOINTS.USERS}/${createdUserBody.id}`,
      );
      expect(getDeletedUser.status()).toBe(API_STATUS_CODES.NOT_FOUND);
    },
  );
});
