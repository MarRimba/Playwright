import { test, expect } from "@playwright/test";
import { LoginPage } from "../../../src/pages/login.page";
import { ArticlesPage } from "../../../src/pages/articles.page";
import { articlePayload, testUserData } from "./test-data/articles.data";
import { TAG, tags } from "../../../src/config/test-tags";

test.describe("Update article", () => {
  let loginPage: LoginPage;
  let articlesPage: ArticlesPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    await page.goto("/");
    await loginPage.mouseHover.hover();
    await loginPage.loginLink.click();
    await loginPage.loginInput.fill(testUserData.userEmail!);
    await loginPage.passwordInput.fill(testUserData.userPassword!);
    await loginPage.loginButton.click();
  });

  test(
    "should update article title with valid data",
    { tag: tags(TAG.UI, TAG.ARTICLES, TAG.UPDATE_ARTICLE) },
    async ({ page }) => {
      // Arrange:
      const createdArticleTitle = `${articlePayload.title} ${Date.now()}`;
      const updatedArticleTitle = `UPDATED ${createdArticleTitle}`;
      const updatedArticleBodySnippet = articlePayload.body.slice(0, 40);

      // Act:
      await articlesPage.articlesLink.click();
      await articlesPage.addArticleButton.click();
      await articlesPage.titleInput.fill(createdArticleTitle);
      await articlesPage.bodyInput.fill(articlePayload.body);
      await articlesPage.imageSelect.selectOption(articlePayload.image);
      await articlesPage.saveButton.click();

      await articlesPage.editButton.click();
      await articlesPage.titleInput.press("Home");
      await articlesPage.titleInput.fill(updatedArticleTitle);
      await articlesPage.updateButton.click();

      // Assert:
      await expect(
        page.getByText(updatedArticleTitle, { exact: true }),
      ).toBeVisible();
      await expect(
        page.getByText(createdArticleTitle, { exact: true }),
      ).toHaveCount(0);
      await expect(page.getByText(updatedArticleBodySnippet)).toBeVisible();

      await page.reload();

      await expect(
        page.getByText(updatedArticleTitle, { exact: true }),
      ).toBeVisible();
      await expect(
        page.getByText(createdArticleTitle, { exact: true }),
      ).toHaveCount(0);
    },
  );
});
