import { test, expect } from "@playwright/test";
import { invalidLoginCases, loginUserData } from "./test-data/login.data";
import { LoginPage } from "../../pages/login.page";

test.describe("User login process", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto("/");
  });

  test(
    "User should be logged with correct credentials",
    { tag: ["@smoke", "@login"] },
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
      { tag: ["@unhappyPath", "@login"] },
      async ({ page }) => {
        // Arrange:
        const expectedElementByTestId = page.getByTestId("login-error");
        const expectedPlaceHolder = page.getByPlaceholder("Enter User Email");

        // Act:
        await loginPage.mouseHover.hover();
        await loginPage.loginLink.click();
        await loginPage.loginInput.fill(testCase.email!);
        await loginPage.passwordInput.fill(testCase.password!);
        await loginPage.loginButton.click();

        // Assert:
        await expect(expectedElementByTestId).toContainText(
          "Invalid username or password",
        );

        if (testCase.shouldValidatePlaceholder) {
          await expect(expectedPlaceHolder).toHaveAttribute(
            "placeholder",
            "Enter User Email",
          );
        }
      },
    );
  }
});
