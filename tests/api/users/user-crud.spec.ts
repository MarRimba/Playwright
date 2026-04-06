import { expect, test } from "playwright/test";
import {
  API_ENDPOINTS,
  API_STATUS_CODES,
} from "../../../src/config/api-constants";
import { TAG, tags } from "../../../src/config/test-tags";
import { userPayload } from "./test-data/user.data";

test.describe("CRUD /users", () => {
  test.only(
    "should create, verify, update and delete user",
    {
      tag: tags(
        TAG.API,
        TAG.USERS,
        TAG.AUTH,
        TAG.POST_USER,
        TAG.PUT_USER,
        TAG.DELETE_USER,
      ),
    },
    async ({ request }) => {
      
      // 1. Create user
      const createdUser = await request.post(`${API_ENDPOINTS.USERS}`, {
        data: userPayload,
      });
      const createdUserBody = await createdUser.json();
      expect(createdUser.status()).toBe(API_STATUS_CODES.CREATED);

      // 2. Verify created user exists
      const getCreatedUser = await request.get(
        `${API_ENDPOINTS.USERS}/${createdUserBody.id}`,
      );
      const getCreatedUserBody = await getCreatedUser.json();

      expect(createdUserBody.id).toEqual(getCreatedUserBody.id);
      expect(getCreatedUser.status()).toBe(API_STATUS_CODES.OK);

      // 3. Log in and update user avatar
      const {
        email: createdUserEmail,
        password: createdUserPsw,
        avatar: createdUserAvatar,
        ...createdUserPayload
      } = userPayload;
      const updatedUserAvatar = `${createdUserAvatar}?updated=1`;

      const loginResponse = await request.post(API_ENDPOINTS.LOGIN, {
        data: {
          email: createdUserEmail,
          password: createdUserPsw,
        },
      });
      const { access_token: bearerToken } = await loginResponse.json();

      const putUser = await request.put(
        `${API_ENDPOINTS.USERS}/${createdUserBody.id}`,
        {
          headers: { Authorization: `Bearer ${bearerToken}` },
          data: {
            ...createdUserPayload,
            email: createdUserEmail,
            password: createdUserPsw,
            avatar: updatedUserAvatar,
          },
        },
      );

      // 4. Verify update response and changed avatar
      const putUserBody = await putUser.json();

      expect(putUser.status()).toBe(API_STATUS_CODES.OK);
      expect(putUserBody.avatar).toBe(updatedUserAvatar);
      expect(putUserBody.avatar).not.toBe(createdUserAvatar);

      // 5. Delete user

      const deletedUser = await request.delete(
        `${API_ENDPOINTS.USERS}/${createdUserBody.id}`,
        { headers: { Authorization: `Bearer ${bearerToken}` } },
      );

      expect(deletedUser.status()).toBe(API_STATUS_CODES.OK);

      const getDeletedUser = await request.get(
        `${API_ENDPOINTS.USERS}/${createdUserBody.id}`,
      );

      // 6. Verify deleted user no longer exists
      expect(getDeletedUser.status()).toBe(API_STATUS_CODES.NOT_FOUND);
    },
  );
});
