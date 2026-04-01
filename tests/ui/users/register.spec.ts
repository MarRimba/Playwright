import { test, expect } from "@playwright/test";
import { requiredFieldCases, userData } from "./test-data/register.data";
import { RegisterPage } from "../../../pages/register.page";
import { TAG, tags } from "../../config/test-tags";

test.describe("User registration", () => {
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await page.goto("/login");
  });

  test(
    "should register a new user",
    { tag: tags(TAG.UI, TAG.SMOKE, TAG.USERS, TAG.REGISTER_USER) },
    async ({ page }) => {
      // Arrange:

      // Act:
      await registerPage.registerLink.click();
      await registerPage.firstNameInput.fill(userData.firstName);
      await registerPage.lastNameInput.fill(userData.lastName);
      await registerPage.emailInput.fill(userData.notUniqueEmail);
      await registerPage.birthdayInput.fill(
        userData.date.toISOString().slice(0, 10),
      );
      await registerPage.buttonDone.click();
      await registerPage.passwordInput.fill(userData.password);
      await registerPage.registerButton.click();

      // Assert:
      await expect(page.getByTestId("alert-popup")).toContainText(
        "User created",
      );
    },
  );

  test(
    "should register a new user with no birthday date",
    { tag: tags(TAG.UI, TAG.USERS, TAG.REGISTER_USER) },
    async ({ page }) => {
      // Arrange:

      // Act:
      await registerPage.registerLink.click();
      await registerPage.firstNameInput.fill(userData.firstName);
      await registerPage.lastNameInput.fill(userData.lastName);
      await registerPage.emailInput.fill(userData.email);
      await registerPage.passwordInput.fill(userData.password);
      await registerPage.registerButton.click();

      // Assert:
      await expect(page.getByTestId("alert-popup")).toContainText(
        "User created",
      );
    },
  );

  test(
    "a new user should not be created due to not unique mail",
    { tag: tags(TAG.UI, TAG.USERS, TAG.REGISTER_USER) },
    async ({ page }) => {
      // Arrange:

      // Act:
      await registerPage.registerLink.click();
      await registerPage.firstNameInput.fill(userData.firstName);
      await registerPage.lastNameInput.fill(userData.lastName);
      await registerPage.emailInput.fill(userData.notUniqueEmail);
      await registerPage.birthdayInput.fill(
        userData.date.toISOString().slice(0, 10),
      );
      await registerPage.buttonDone.click();
      await registerPage.passwordInput.fill(userData.password);
      await registerPage.registerButton.click();

      // Assert:
      await expect(page.getByTestId("alert-popup")).toContainText(
        "User not created! Email not unique",
      );
    },
  );

  for (const testCase of requiredFieldCases) {
    test(
      testCase.testName,
      { tag: tags(TAG.UI, TAG.USERS, TAG.REGISTER_USER) },
      async ({ page }) => {
        // Arrange:

        // Act:
        await registerPage.registerLink.click();
        await registerPage.firstNameInput.fill(testCase.firstName);
        await registerPage.lastNameInput.fill(testCase.lastName);
        await registerPage.emailInput.fill(testCase.email);
        await registerPage.birthdayInput.fill(
          userData.date.toISOString().slice(0, 10),
        );
        await registerPage.buttonDone.click();
        await registerPage.passwordInput.fill(testCase.password);
        await registerPage.registerButton.click();

        // Assert:
        await expect(page.locator(testCase.errorSelector)).toHaveText(
          "This field is required",
        );
      },
    );
  }

  test(
    "a new user should not be created due to incorrect user mail format",
    { tag: tags(TAG.UI, TAG.USERS, TAG.REGISTER_USER) },
    async ({ page }) => {
      // Arrange:

      // Act:
      await registerPage.registerLink.click();
      await registerPage.firstNameInput.fill(userData.firstName);
      await registerPage.lastNameInput.fill(userData.lastName);
      await registerPage.emailInput.fill(userData.email.replace("@", "#"));
      await registerPage.birthdayInput.fill(
        userData.date.toISOString().slice(0, 10),
      );
      await registerPage.buttonDone.click();
      await registerPage.passwordInput.fill(userData.password);
      await registerPage.registerButton.click();

      // Assert:
      await expect(page.locator("#octavalidate_email")).toHaveText(
        "Please provide a valid email address",
      );
    },
  );
});
