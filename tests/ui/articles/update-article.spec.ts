import { test, expect } from "@playwright/test";
import { LoginPage } from "../../../pages/login.page";
import { ArticlesPage } from "../../../pages/articles.page";
import { testUserData } from "./test-data/articles.data";

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
    { tag: ["@articles", "@updateArticle"] },
    async ({ page }) => {
      // Arrange:

      // Act:
      await articlesPage.myArticlesButton.click();
      await page.getByTestId("article-37").click();
      await page
        .getByRole("link", { name: "What is Playwright and why" })
        .click();
      await articlesPage.editButton.click();
      await articlesPage.titleInput.press("Home");
      await articlesPage.titleInput.fill(
        "UPDATE: What is Playwright and why use it?",
      );
      await articlesPage.updateButton.click();

      // Assert:
      await expect(articlesPage.alertPopup).toBeVisible();
      await expect(articlesPage.alertPopup).toContainText(
        "Article was updated",
      );
    },
  );
});
