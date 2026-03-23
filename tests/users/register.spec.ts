import { test, expect } from "@playwright/test";
import { requiredFieldCases, userData} from "./test-data/register.data";

test.describe("User registration", () => {


  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });
  test(
    "should register a new user",
    { tag: ["@smoke", "@registerUser"] },
    async ({ page }) => {
      // Arrange:

      // Act:
      
      await page.getByRole("link", { name: "Register" }).click();
      await page.getByTestId("firstname-input").fill(userData.firstName);
      await page.getByTestId("lastname-input").fill(userData.lastName);
      await page.getByTestId("email-input").fill(userData.notUniqueEmail);
      await page.getByTestId("birthdate-input").fill(userData.date.toISOString().slice(0, 10));
      await page.getByRole("button", { name: "Done" }).click();
      await page.getByTestId("password-input").fill(userData.password);
      await page.getByTestId("register-button").click();

      // Assert:
      await expect(page.getByTestId("alert-popup")).toContainText(
        "User created",
      );
    },
  );

  test(
    "should register a new user with no birthday date",
    { tag: ["@registerUser"] },
    async ({ page }) => {
      // Arrange:

      // Act:
      await page.getByRole("link", { name: "Register" }).click();
      await page.getByTestId("firstname-input").fill(userData.firstName);
      await page.getByTestId("lastname-input").fill(userData.lastName);
      await page.getByTestId("email-input").fill(userData.email);
      await page.getByTestId("password-input").fill(userData.password);
      await page.getByTestId("register-button").click();

      // Assert:
      await expect(page.getByTestId("alert-popup")).toContainText(
        "User created",
      );
    },
  );

  test(
    "a new user should not be created due to not unique mail",
    { tag: ["@registerUser"] },
    async ({ page }) => {
      // Arrange:

      // Act:
      await page.getByRole("link", { name: "Register" }).click();
      await page.getByTestId("firstname-input").fill(userData.firstName);
      await page.getByTestId("lastname-input").fill(userData.lastName);
      await page.getByTestId("email-input").fill(userData.notUniqueEmail);
      await page.getByTestId("birthdate-input").fill(userData.date.toISOString().slice(0, 10));
      await page.getByRole("button", { name: "Done" }).click();
      await page.getByTestId("password-input").fill(userData.password);
      await page.getByTestId("register-button").click();

      // Assert:
      await expect(page.getByTestId("alert-popup")).toContainText(
        "User not created! Email not unique",
      );
    },
  );

  for (const testCase of requiredFieldCases) {
    test(testCase.testName, { tag: ["@registerUser"] }, async ({ page }) => {
      // Arrange:

      // Act:
      await page.getByRole("link", { name: "Register" }).click();
      await page.getByTestId("firstname-input").fill(testCase.firstName);
      await page.getByTestId("lastname-input").fill(testCase.lastName);
      await page.getByTestId("email-input").fill(testCase.email);
      await page.getByTestId("birthdate-input").fill(userData.date.toISOString().slice(0, 10));
      await page.getByRole("button", { name: "Done" }).click();
      await page.getByTestId("password-input").fill(testCase.password);
      await page.getByTestId("register-button").click();

      // Assert:
      await expect(page.locator(testCase.errorSelector)).toHaveText(
        "This field is required",
      );
    });
  }

  test(
    "a new user should not be created due to incorrect user mail format",
    { tag: ["@registerUser"] },
    async ({ page }) => {
      // Arrange:

      // Act:
      await page.getByRole("link", { name: "Register" }).click();
      await page.getByTestId("firstname-input").fill(userData.firstName);
      await page.getByTestId("lastname-input").fill(userData.lastName);
      await page.getByTestId("email-input").fill(userData.email.replace("@", "#"));
      await page.getByTestId("birthdate-input").fill(userData.date.toISOString().slice(0, 10));
      await page.getByRole("button", { name: "Done" }).click();
      await page.getByTestId("password-input").fill(userData.password);
      await page.getByTestId("register-button").click();

      // Assert:
      await expect(page.locator("#octavalidate_email")).toHaveText(
        "Please provide a valid email address",
      );
    },
  );
});
