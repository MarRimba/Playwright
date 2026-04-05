import { test, expect } from "@playwright/test";
import { API_HEADERS } from "../../../src/config/api-headers";
import {
  API_ENDPOINTS,
  API_STATUS_CODES,
} from "../../../src/config/api-constants";
import { userIds } from "../users/test-data/user.data";
import { TAG, tags } from "../../../src/config/test-tags";

test.describe("PATCH /articles/{id}", () => {
  type Article = {
    id: number;
    title: string;
    user_id: number;
  };
  const headers = API_HEADERS.AUTHORIZED();

  test(
    "should update the title of a random article belonging to the user",
    { tag: tags(TAG.API, TAG.ARTICLES, TAG.UPDATE_ARTICLE) },
    async ({ request }) => {
      //Arrange:
      const response = await request.get(
        `${API_ENDPOINTS.ARTICLES}?user_id=${userIds.userIdToPatch}`,
        { headers },
      );
      const allArticlesGivenUser = (await response.json()) as Article[];

      expect(
        allArticlesGivenUser.every(
          (article) => article.user_id === userIds.userIdToPatch,
        ),
      ).toBeTruthy();

      const randomArticle =
        allArticlesGivenUser[
          Math.floor(Math.random() * allArticlesGivenUser.length)
        ];

      //Act:

      const updatedResponse = await request.patch(
        `${API_ENDPOINTS.ARTICLES}/${randomArticle.id}`,
        {
          headers,
          data: {
            title: `UPDATED ${randomArticle.title}`,
          },
        },
      );

      //Assert:

      const updatedResponseBody = await updatedResponse.json();

      expect(updatedResponseBody.title).not.toBe(randomArticle.title);
      expect(updatedResponse.status()).toEqual(API_STATUS_CODES.OK);
    },
  );

  test(
    "should update the title of the first article belonging to the user",
    { tag: tags(TAG.API, TAG.ARTICLES, TAG.UPDATE_ARTICLE) },
    async ({ request }) => {
      //Arrange:
      const response = await request.get(
        `${API_ENDPOINTS.ARTICLES}?user_id=${userIds.userIdToPatch}`,
        { headers },
      );
      const allArticlesGivenUser = (await response.json()) as Article[];

      expect(
        allArticlesGivenUser.every(
          (article) => article.user_id === userIds.userIdToPatch,
        ),
      ).toBeTruthy();

      const specificArticle = allArticlesGivenUser[0];
      const updatedTitle = `UPDATED ${specificArticle.title}`;

      //Act:
      const updatedResponse = await request.patch(
        `${API_ENDPOINTS.ARTICLES}/${specificArticle.id}`,
        {
          headers,
          data: {
            title: updatedTitle,
          },
        },
      );

      //Assert:
      const updatedResponseBody = (await updatedResponse.json()) as Article;

      expect(updatedResponse.status()).toBe(API_STATUS_CODES.OK);
      expect(updatedResponseBody.id).toBe(specificArticle.id);
      expect(updatedResponseBody.user_id).toBe(userIds.userIdToPatch);
      expect(updatedResponseBody.title).toBe(updatedTitle);
    },
  );
});
