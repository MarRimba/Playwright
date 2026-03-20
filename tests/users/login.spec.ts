import { test, expect } from "@playwright/test";

test.describe("User login process", () => {
  const invalidLoginCases = [
    {
      testName: "User should not be logged due to incorrect password",
      email: "Kerra.JD@test.net",
      password: "gdsass",
      shouldValidatePlaceholder: false,
    },
    {
      testName: "User should not be logged due to incorrect user mail",
      email: "Kerra.JD@test.nets",
      password: "gdsa",
      shouldValidatePlaceholder: true,
    },
    {
      testName:
        "User should not be logged due to incorrect user mail (space in password)",
      email: " Kerra.JD@test.net",
      password: "gdsa",
      shouldValidatePlaceholder: true,
    },
  ];

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
        .fill("Kerra.JD@test.net");
      await page.getByRole("textbox", { name: "Enter Password" }).fill("gdsa");
      await page.getByRole("button", { name: "LogIn" }).click();

      // Assert:
      await expect(expectedElementByTestId).toContainText(
        "Hi Kerra.JD@test.net!",
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
