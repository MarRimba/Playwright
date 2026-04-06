import { expect, test } from "playwright/test";
import {
  API_ENDPOINTS,
  API_STATUS_CODES,
} from "../../../src/config/api-constants";
import { API_HEADERS } from "../../../src/config/api-headers";
import { articlePayload } from "./test-data/article.data";
import { TAG, tags } from "../../../src/config/test-tags";

test.describe("DELETE /article", () => {
  const headers = API_HEADERS.AUTHORIZED();
  test(
    "should create and delete article",
    { tag: tags(TAG.API, TAG.ARTICLES, TAG.DELETE_ARTICLE) },
    async ({ request }) => {
      // Arrange:

      const getArticles = await request.get(API_ENDPOINTS.ARTICLES);
      const getArticlesBody = await getArticles.json();

      const createdArticle = await request.post(API_ENDPOINTS.ARTICLES, {
        headers,
        data: articlePayload,
      });
      const createdArticleBody = await createdArticle.json();
      const articlesAfterCreate = await (
        await request.get(API_ENDPOINTS.ARTICLES)
      ).json();

      expect(articlesAfterCreate.length - getArticlesBody.length).toBe(1);

      expect(
        articlesAfterCreate.find(
          (article: { id: number }) => article.id === createdArticleBody.id,
        ),
      ).toBeDefined();

      // Act:

      const deleteArticle = await request.delete(
        `${API_ENDPOINTS.ARTICLES}/${createdArticleBody.id}`,
        { headers },
      );

      // Assert:
      expect(deleteArticle.status()).toBe(API_STATUS_CODES.OK);

      const getDeletedAricle = await request.get(
        `${API_ENDPOINTS.ARTICLES}/${createdArticleBody.id}`,
      );

      expect(getDeletedAricle.status()).toBe(API_STATUS_CODES.NOT_FOUND);
    },
  );

  test(
    "should not delete article for unauthorized user",
    { tag: tags(TAG.API, TAG.ARTICLES, TAG.DELETE_ARTICLE, TAG.UNHAPPY_PATH) },
    async ({ request }) => {
      // Arrange:
      const createdArticle = await request.post(API_ENDPOINTS.ARTICLES, {
        headers,
        data: articlePayload,
      });
      const createdArticleBody = await createdArticle.json();

      // Act:
      const deleteArticle = await request.delete(
        `${API_ENDPOINTS.ARTICLES}/${createdArticleBody.id}`,
      );

      // Assert:
      expect(deleteArticle.status()).toBe(API_STATUS_CODES.UNAUTHORIZED);

      const getArticleAfterFailedDelete = await request.get(
        `${API_ENDPOINTS.ARTICLES}/${createdArticleBody.id}`,
      );

      expect(getArticleAfterFailedDelete.status()).toBe(API_STATUS_CODES.OK);

      await request.delete(
        `${API_ENDPOINTS.ARTICLES}/${createdArticleBody.id}`,
        {
          headers,
        },
      );
    },
  );
});
