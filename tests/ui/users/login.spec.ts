import { test, expect } from "@playwright/test";
import { invalidLoginCases, loginUserData } from "./test-data/login.data";
import { LoginPage } from "../../../src/pages/login.page";
import { TAG, tags } from "../../../src/config/test-tags";

test.describe("User login process", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto("/");
  });

  test(
    "User should be logged with correct credentials",
    { tag: tags(TAG.UI, TAG.SMOKE, TAG.USERS, TAG.LOGIN) },
    async ({ page }) => {
      // Arrange:
      const expectedElementByTestId = page.getByTestId("hello");

      // Act:
      await loginPage.mouseHover.hover();
      await loginPage.loginLink.click();
      await loginPage.loginInput.fill(loginUserData.userCorrectLogin!);
      await loginPage.passwordInput.fill(loginUserData.userCorrectPassword!);
      await loginPage.loginButton.click();

      // Assert:
      await expect(expectedElementByTestId).toContainText(
        `Hi ${loginUserData.userCorrectLogin}!`,
      );
    },
  );

  for (const testCase of invalidLoginCases) {
    test(
      testCase.testName,
      { tag: tags(TAG.UI, TAG.USERS, TAG.LOGIN, TAG.UNHAPPY_PATH) },
      async ({ page }) => {
        // Act:
        await loginPage.mouseHover.hover();
        await loginPage.loginLink.click();
        await loginPage.loginInput.fill(testCase.email!);
        await loginPage.passwordInput.fill(testCase.password!);
        await loginPage.loginButton.click();

        // Assert:
        await expect(loginPage.loginError).toContainText(
          "Invalid username or password",
        );

        if (testCase.shouldValidatePlaceholder) {
          await expect(loginPage.loginInput).toHaveAttribute(
            "placeholder",
            "Enter User Email",
          );
        }
      },
    );
  }

  test(
    "User should be logged and logged out correctly",
    { tag: tags(TAG.UI, TAG.SMOKE, TAG.USERS, TAG.LOGOUT) },
    async ({ page }) => {
      // Arrange:
      const expectedElementByTestId = page.getByTestId("hello");

      await loginPage.mouseHover.hover();
      await loginPage.loginLink.click();
      await loginPage.loginInput.fill(loginUserData.userCorrectLogin!);
      await loginPage.passwordInput.fill(loginUserData.userCorrectPassword!);
      await loginPage.loginButton.click();

      await expect(expectedElementByTestId).toContainText(
        `Hi ${loginUserData.userCorrectLogin}!`,
      );

      // Act:
      await loginPage.logoutButton.click();

      // Assert:
      await expect(page).toHaveURL("/login/");
    },
  );

  test(
    "User should be logged and next account should be deleted",
    { tag: tags(TAG.UI, TAG.USERS, TAG.DELETE_USER) },
    async ({ page }) => {
      // Arrange:
      const expectedElementByTestId = page.getByTestId("hello");

      await loginPage.mouseHover.hover();
      await loginPage.loginLink.click();
      await loginPage.loginInput.fill(loginUserData.userCorrectLogin!);
      await loginPage.passwordInput.fill(loginUserData.userCorrectPassword!);
      await loginPage.loginButton.click();

      await expect(expectedElementByTestId).toContainText(
        `Hi ${loginUserData.userCorrectLogin}!`,
      );

      // Act:
      page.once("dialog", (dialog) => {
        dialog.accept().catch(() => {});
      });
      await Promise.all([
        page.waitForURL("**/login/**"),
        page.getByTestId("deleteButton").click(),
      ]);

      // Assert:
      await expect(page).toHaveURL(/\/login\/?$/);
    },
  );
});
