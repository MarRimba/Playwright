import { test, expect } from "@playwright/test";
import {
  invalidLoginCases,
loginUserData
} from "./test-data/login.data";

test.describe("User login process", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test(
    "User should be logged with correct credentials",
    { tag: ["@smoke", "@login"] },
    async ({ page }) => {
      // Arrange:
      const expectedElementByTestId = page.getByTestId("hello");

      // Act:
      await page.getByTestId("btn-dropdown").hover();
      await page.getByRole("link", { name: "Login" }).click();
      await page
        .getByRole("textbox", { name: "Enter User Email" })
        .fill(loginUserData.userCorrectLogin);
      await page
        .getByRole("textbox", { name: "Enter Password" })
        .fill(loginUserData.userCorrectPassword);
      await page.getByRole("button", { name: "LogIn" }).click();

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
        await page.getByTestId("btn-dropdown").hover();
        await page.getByRole("link", { name: "Login" }).click();
        await page
          .getByRole("textbox", { name: "Enter User Email" })
          .fill(testCase.email);
        await page
          .getByRole("textbox", { name: "Enter Password" })
          .fill(testCase.password);
        await page.getByRole("button", { name: "LogIn" }).click();

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
