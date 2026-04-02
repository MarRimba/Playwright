import { test, expect } from "@playwright/test";
import {
  API_ENDPOINTS,
  API_STATUS_CODES,
} from "../../../src/config/api-constants";
import {
  articlePayload,
  defaultApiRequiredFieldCases,
} from "./test-data/article.data";
import { API_HEADERS } from "../../../src/config/api-headers";
import { TAG, tags } from "../../../src/config/test-tags";

test.describe("/POST article", () => {
  const headers = API_HEADERS.AUTHORIZED();

  test("should create valid and unique article", async ({ request }) => {
    const articleResponse = await request.post(API_ENDPOINTS.ARTICLES, {
      headers,
      data: articlePayload,
    });

    const articleResponseBody = await articleResponse.json();

    const responseWIthArticleId = await request.get(
      `${API_ENDPOINTS.ARTICLES}/${articleResponseBody.id}`,
    );

    expect(articleResponse.status()).toBe(API_STATUS_CODES.CREATED);

    const createdArticle = await responseWIthArticleId.json();

    expect(createdArticle.id).toEqual(articleResponseBody.id);
    expect(createdArticle.title).toEqual(articleResponseBody.title);
    expect(createdArticle.date).toEqual(articleResponseBody.date);
    expect(createdArticle.image).toEqual(articleResponseBody.image);
  });

  for (const apiTestCase of defaultApiRequiredFieldCases) {
    test(
      apiTestCase.testName,
      { tag: tags(TAG.API, TAG.ARTICLES, TAG.POST_ARTICLE) },
      async ({ request }) => {
        // Arrange:
        const { testName: _testName, ...invalidPayload } = apiTestCase;

        // Act:
        const response = await request.post(API_ENDPOINTS.ARTICLES, {
          headers,
          data: invalidPayload,
        });

        // Assert:
        expect(
          response.status(),
          `For POST api/articles/ we expect status code ${API_STATUS_CODES.UNPROCESSABLE_ENTITY}`,
        ).toBe(API_STATUS_CODES.UNPROCESSABLE_ENTITY);
      },
    );
  }

  test(
    "should create article without image",
    { tag: tags(TAG.API, TAG.ARTICLES, TAG.POST_ARTICLE) },
    async ({ request }) => {
      // Arrange:
      const { image: _image, ...payloadWithoutImage } = articlePayload;

      // Act:
      const response = await request.post(API_ENDPOINTS.ARTICLES, {
        headers,
        data: payloadWithoutImage,
      });

      const createdArticleBody = await response.json();

      // Assert:
      expect(response.status()).toBe(API_STATUS_CODES.CREATED);
    },
  );
});
