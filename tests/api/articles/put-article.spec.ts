import { expect, test } from "@playwright/test";
import { API_HEADERS } from "../../../src/config/api-headers";
import {
  API_ENDPOINTS,
  API_STATUS_CODES,
} from "../../../src/config/api-constants";
import { userIds } from "../users/test-data/user.data";
import {
  articlePayload,
  defaultApiRequiredFieldCases,
} from "./test-data/article.data";

test.describe("PUT /articles/{id}", () => {
  type Article = {
    id: number;
    title: string;
    body: string;
    image: string;
    user_id: number;
  };
  const headers = API_HEADERS.AUTHORIZED();

  const getRandomArticleForUser = async (request: { get: Function }) => {
    const response = await request.get(
      `${API_ENDPOINTS.ARTICLES}?user_id=${userIds.userIdToPut}`,
      { headers },
    );
    const allArticlesGivenUser = (await response.json()) as Article[];

    expect(
      allArticlesGivenUser.every(
        (article) => article.user_id === userIds.userIdToPut,
      ),
    ).toBeTruthy();

    return allArticlesGivenUser[
      Math.floor(Math.random() * allArticlesGivenUser.length)
    ];
  };

  test("should update all article data for given article", async ({
    request,
  }) => {
    //Arrange:
    const randomArticle = await getRandomArticleForUser(request);

    //Act:

    const updatedResponse = await request.put(
      `${API_ENDPOINTS.ARTICLES}/${randomArticle.id}`,
      {
        headers,
        data: articlePayload,
      },
    );

    //Assert:
    const updatedResponseBody = await updatedResponse.json();

    expect(updatedResponse.status()).toEqual(API_STATUS_CODES.OK);
    expect(updatedResponseBody.id).toBe(randomArticle.id);
    expect(updatedResponseBody.title).toBe(articlePayload.title);
    expect(updatedResponseBody.body).toBe(articlePayload.body);
    expect(updatedResponseBody.image).toBe(articlePayload.image);
  });

  for (const apiTestCase of defaultApiRequiredFieldCases) {
    test(apiTestCase.testName, async ({ request }) => {
      // Arrange:
      const { testName: _testName, ...invalidPayload } = apiTestCase;
      const randomArticle = await getRandomArticleForUser(request);

      // Act:
      const response = await request.put(
        `${API_ENDPOINTS.ARTICLES}/${randomArticle.id}`,
        {
          headers,
          data: invalidPayload,
        },
      );

      // Assert:
      expect(
        response.status(),
        `For PUT api/articles/{id} we expect status code ${API_STATUS_CODES.UNPROCESSABLE_ENTITY}`,
      ).toBe(API_STATUS_CODES.UNPROCESSABLE_ENTITY);
    });
  }

  test("should not update article due to invalid JSON payload", async ({
    request,
  }) => {
    // Arrange:
    const randomArticle = await getRandomArticleForUser(request);

    // Act:
    const response = await request.fetch(
      `${API_ENDPOINTS.ARTICLES}/${randomArticle.id}`,
      {
        method: "PUT",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        data: '{"title":"Broken JSON",',
      },
    );

    // Assert:
    expect(
      response.status(),
      `For PUT api/articles/{id} with invalid JSON we expect status code ${API_STATUS_CODES.BAD_REQUEST}`,
    ).toBe(API_STATUS_CODES.BAD_REQUEST);
  });
});
