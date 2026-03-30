import { test, expect } from "@playwright/test";
import { UI_URL } from "../config/ui-ulr";
import { ArticlesPage } from "../../../pages/articles.page";

test.describe("should display a list of articles", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test(
    "test",
    { tag: ["@articles", "@getArticles"] },
    async ({ page }) => {
      // Arrange:
      const articlesPage = new ArticlesPage(page);
      const firstPageArticleTitle = "Myth: Testing is only for";

      // Act:
      await page.getByRole("link", { name: "Articles" }).click();
      await page.getByRole("link", { name: firstPageArticleTitle }).click();
      await expect(page.getByText(firstPageArticleTitle)).toBeVisible();

      await page.goto(`${UI_URL.ARTICLE}.html`);
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
