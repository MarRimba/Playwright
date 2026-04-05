import { test, expect } from "@playwright/test";
import { LoginPage } from "../../../src/pages/login.page";
import { ArticlesPage } from "../../../src/pages/articles.page";
import { articlePayload } from "./test-data/articles.data";
import { loginUserData } from "./test-data/articles.data";
import { TAG, tags } from "../../../src/config/test-tags";

test.describe("Delete article", () => {
  let loginPage: LoginPage;
  let articlesPage: ArticlesPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    await page.goto("/");
    await loginPage.mouseHover.hover();
    await loginPage.loginLink.click();
    await loginPage.loginInput.fill(loginUserData.userCorrectLogin!);
    await loginPage.passwordInput.fill(loginUserData.userCorrectPassword!);
    await loginPage.loginButton.click();
  });

  test(
    "should delete article",
    { tag: tags(TAG.UI, TAG.ARTICLES, TAG.DELETE_ARTICLE) },
    async ({ page }) => {
      // Arrange:
      const createdArticleTitle = `${articlePayload.title} ${Date.now()}`;

      await articlesPage.articlesLink.click();
      await articlesPage.addArticleButton.click();
      await articlesPage.titleInput.fill(createdArticleTitle);
      await articlesPage.bodyInput.fill(articlePayload.body);
      await articlesPage.imageSelect.selectOption(articlePayload.image);
      await articlesPage.saveButton.click();
      await page.waitForURL(/id=/);

      const createdArticleUrl = page.url();
      const articleId = new URL(createdArticleUrl).searchParams.get("id");
      const articleDetailsUrl = `/article.html?id=${articleId}`;
      const articlesListUrl = "/articles.html";

      await page.goto(articleDetailsUrl);
      await expect(page).toHaveURL(articleDetailsUrl);
      await expect(
        page.getByText(createdArticleTitle, { exact: true }),
      ).toBeVisible();

      // Act:

      await articlesPage.articlesLink.click();
      await articlesPage.articleTitleLinks
        .filter({ hasText: createdArticleTitle })
        .click();
      page.once("dialog", (dialog) => {
        dialog.accept().catch(() => {});
      });
      await articlesPage.deleteButton.click();
      await page.goto(articlesListUrl);

      // Assert:
      await expect(
        articlesPage.articleTitleLinks.filter({
          hasText: createdArticleTitle,
        }),
      ).toHaveCount(0);

      await page.reload();

      await expect(
        articlesPage.articleTitleLinks.filter({
          hasText: createdArticleTitle,
        }),
      ).toHaveCount(0);
    },
  );
});
