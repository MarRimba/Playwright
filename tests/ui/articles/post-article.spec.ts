import { test, expect } from "@playwright/test";
import { LoginPage } from "../../../pages/login.page";
import { loginUserData } from "../users/test-data/login.data";

test.describe("Add article", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
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

// TO DO:

      // Arrange:
      // Act:
      // Assert:
    },
  );
});
