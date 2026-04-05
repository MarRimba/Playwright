import { test, expect } from "@playwright/test";
import { UI_URL } from "../../../src/config/ui-constants";
import { ArticlesPage } from "../../../src/pages/articles.page";
import { API_STATUS_CODES } from "../../../src/config/api-constants";
import { TAG, tags } from "../../../src/config/test-tags";

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

      // Act:
      await page.getByRole("link", { name: "Articles" }).click();
      await expect(articlesPage.articleCards.first()).toBeVisible();

      const firstPageArticleTitle = await articlesPage
        .getArticleTitleLink(0)
        .textContent();

      expect(firstPageArticleTitle?.trim()).toBeTruthy();

      await articlesPage.getArticleTitleLink(0).click();
      await expect(
        page.getByText(firstPageArticleTitle!.trim(), { exact: true }),
      ).toBeVisible();

      const articlesResponse = await page.goto(`${UI_URL.ARTICLE}.html`);
      expect(articlesResponse?.status()).toBe(API_STATUS_CODES.OK);
      await expect(articlesPage.nextButton).toBeEnabled();
      await articlesPage.nextButton.click();

      // Assert page 2 is loaded:
      await expect(articlesPage.currentPage).toHaveText("2");

      const secondArticleLink = articlesPage.getArticleTitleLink(1);
      const secondArticleTitle = await secondArticleLink.textContent();

      expect(secondArticleTitle?.trim()).toBeTruthy();
      expect(secondArticleTitle?.trim()).not.toBe(
        firstPageArticleTitle?.trim(),
      );

      await secondArticleLink.click();

      // Assert:
      await expect(
        page.getByText(secondArticleTitle!.trim(), { exact: true }),
      ).toBeVisible();
    },
  );
});
