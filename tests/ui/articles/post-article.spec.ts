import { test, expect } from "@playwright/test";
import { LoginPage } from "../../../pages/login.page";
import { ArticlesPage } from "../../../pages/articles.page";
import { loginUserData } from "../users/test-data/login.data";
import { articlePayload } from "./test-data/articles.data";

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
    { tag: ["@articles", "@postArticle"] },
    async ({ page }) => {
      // Arrange:

      // Act:
      await articlesPage.articlesLink.click();
      await articlesPage.addArticleButton.click();
      await articlesPage.titleInput.fill(articlePayload.title);
      await articlesPage.bodyInput.fill(articlePayload.body);
      await articlesPage.imageSelect.selectOption(articlePayload.image);
      await articlesPage.saveButton.click();

      // Assert:
      const alertPopup = page.getByTestId("alert-popup");

      await expect(alertPopup).toBeVisible();
      await expect(alertPopup).toContainText("Article was created");

      await expect(page).toHaveURL(
        /article\.html\?id=\d+&msg=Article%20was%20created/,
      );
    },
  );
});
