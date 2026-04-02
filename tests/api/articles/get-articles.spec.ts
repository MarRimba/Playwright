import { test, expect } from "@playwright/test";
import {
  API_ENDPOINTS,
  API_STATUS_CODES,
} from "../../../src/config/api-constants";
import { TAG, tags } from "../../../src/config/test-tags";

test.describe("/GET Articles", () => {
  type Article = {
    id: number;
  };

  test(
    "should get a list of articles",
    { tag: tags(TAG.API, TAG.SMOKE, TAG.ARTICLES, TAG.GET_ARTICLES) },
    async ({ request }) => {
      //Arrange:

      //Act:
      const response = await request.get(API_ENDPOINTS.ARTICLES);
      const responseBody = (await response.json()) as Article[];

      //Assert:
      expect(
        response.status(),
        `For /GET articles we expect ${API_STATUS_CODES.OK}`,
      ).toBe(API_STATUS_CODES.OK);

      expect(
        Array.isArray(responseBody),
        "Expected response body to be an array",
      ).toBeTruthy();

      expect(
        responseBody.length,
        "Expected articles list to contain at least one article",
      ).toBeGreaterThan(0);
    },
  );

  test(
    "should return randomly selected article from articles list",
    { tag: tags(TAG.API, TAG.ARTICLES, TAG.GET_ARTICLES) },
    async ({ request }) => {
      //Arrange:
      const response = await request.get(API_ENDPOINTS.ARTICLES);
      const allArticles = (await response.json()) as Article[];
      const randomArticle =
        allArticles[Math.floor(Math.random() * allArticles.length)];

      //Act:
      const articleResponse = await request.get(
        `${API_ENDPOINTS.ARTICLES}/${randomArticle.id}`,
      );

      //Assert:
      expect(
        articleResponse.status(),
        `For GET /articles/${randomArticle.id} we expect status code ${API_STATUS_CODES.OK}`,
      ).toBe(API_STATUS_CODES.OK);

      const responseBody = (await articleResponse.json()) as Article;

      expect(responseBody.id, "Expected matching article id").toBe(
        randomArticle.id,
      );
    },
  );
});
