import { test, expect } from "@playwright/test";
import { UI_URL } from "../../config/ui-constants";
import { ArticlesPage } from "../../../pages/articles.page";
import { API_STATUS_CODES } from "../../config/api-constants";
import { TAG, tags } from "../../config/test-tags";

test.describe("should display a list of articles", () => {
  test.beforeEach(async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(API_STATUS_CODES.OK);
  });

  test(
    "should display list of articles for 1st and next 2nd page",
    { tag: tags(TAG.UI, TAG.ARTICLES, TAG.GET_ARTICLES) },
    async ({ page }) => {
      // Arrange:
      const articlesPage = new ArticlesPage(page);
      const firstPageArticleTitle = "Myth: Testing is only for";

      // Act:
      await page.getByRole("link", { name: "Articles" }).click();
      await page.getByRole("link", { name: firstPageArticleTitle }).click();
      await expect(page.getByText(firstPageArticleTitle)).toBeVisible();

      const articlesResponse = await page.goto(`${UI_URL.ARTICLE}.html`);
      expect(articlesResponse?.status()).toBe(API_STATUS_CODES.OK);
      await expect(articlesPage.nextButton).toBeEnabled();
      await articlesPage.nextButton.click();

      // Assert page 2 is loaded:
      await expect(articlesPage.currentPage).toHaveText("2");

      const secondArticleLink = articlesPage.getArticleTitleLink(1);
      const secondArticleTitle = await secondArticleLink.textContent();
      await secondArticleLink.click();

      // Assert:
      await expect(
        page.getByText(secondArticleTitle!, { exact: true }),
      ).toBeVisible();
    },
  );
});
