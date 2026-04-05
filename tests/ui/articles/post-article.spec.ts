import { test, expect } from "@playwright/test";
import { LoginPage } from "../../../src/pages/login.page";
import { ArticlesPage } from "../../../src/pages/articles.page";
import { loginUserData } from "../users/test-data/login.data";
import { articlePayload } from "./test-data/articles.data";
import { TAG, tags } from "../../../src/config/test-tags";

test.describe("Add article", () => {
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
    "should add article with valid data",
    { tag: tags(TAG.UI, TAG.ARTICLES, TAG.POST_ARTICLE) },
    async ({ page }) => {
      // Arrange:
      const createdArticleTitle = `${articlePayload.title} ${Date.now()}`;
      const createdArticleBodySnippet = articlePayload.body.slice(0, 40);

      // Act:
      await articlesPage.articlesLink.click();
      await articlesPage.addArticleButton.click();
      await articlesPage.titleInput.fill(createdArticleTitle);
      await articlesPage.bodyInput.fill(articlePayload.body);
      await articlesPage.imageSelect.selectOption(articlePayload.image);
      await articlesPage.saveButton.click();

      // Assert:
      await expect(page).toHaveURL(/article\.html\?id=\d+/);
      await expect(
        page.getByText(createdArticleTitle, { exact: true }),
      ).toBeVisible();
      await expect(page.getByText(createdArticleBodySnippet)).toBeVisible();

      await page.reload();

      await expect(
        page.getByText(createdArticleTitle, { exact: true }),
      ).toBeVisible();
      await expect(page.getByText(createdArticleBodySnippet)).toBeVisible();
    },
  );
});
