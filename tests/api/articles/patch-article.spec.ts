import { test, expect } from "@playwright/test";
import { API_HEADERS } from "../../../src/config/api-headers";
import {
  API_ENDPOINTS,
  API_STATUS_CODES,
} from "../../../src/config/api-constants";
import { userIds } from "../users/test-data/user.data";

test.describe("/PATCH articles", () => {
  type Article = {
    id: number;
    title: string;
    user_id: number;
  };
  const headers = API_HEADERS.AUTHORIZED();

  test("should update an article with given ID", async ({ request }) => {
    
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
  });
});
