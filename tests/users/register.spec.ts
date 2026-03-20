import { test, expect } from "@playwright/test";

test.describe("User registration", () => {
  const requiredFieldCases = [
    {
      testName: "a new user should not be created due to missing first name",
      firstName: "",
      lastName: "Doe",
      email: "john.doe@test3.com",
      password: "extremlySecretPassword",
      errorSelector: "#octavalidate_firstname",
    },
    {
      testName: "a new user should not be created due to missing last name",
      firstName: "John",
      lastName: "",
      email: "john.doe@test4.com",
      password: "extremlySecretPassword",
      errorSelector: "#octavalidate_lastname",
    },
    {
      testName: "a new user should not be created due to missing email",
      firstName: "John",
      lastName: "Doe",
      email: "",
      password: "extremlySecretPassword",
      errorSelector: "#octavalidate_email",
    },
    {
      testName: "a new user should not be created due to missing password",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@test5.com",
      password: "",
      errorSelector: "#octavalidate_password",
    },
  ];

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
      await page.getByTestId("firstname-input").fill("John");
      await page.getByTestId("lastname-input").fill("Doe");
      await page.getByTestId("email-input").fill("john.doe@test.com");
      await page.getByTestId("birthdate-input").fill("1990-12-31");
      await page.getByRole("button", { name: "Done" }).click();
      await page.getByTestId("password-input").fill("extremlySecretPassword");
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
      await page.getByTestId("firstname-input").fill("John");
      await page.getByTestId("lastname-input").fill("Doe");
      await page.getByTestId("email-input").fill("john.doe@test2.com");
      await page.getByTestId("password-input").fill("extremlySecretPassword");
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
      await page.getByTestId("firstname-input").fill("John");
      await page.getByTestId("lastname-input").fill("Doe");
      await page.getByTestId("email-input").fill("john.doe@test.com");
      await page.getByTestId("birthdate-input").fill("1990-12-31");
      await page.getByRole("button", { name: "Done" }).click();
      await page.getByTestId("password-input").fill("extremlySecretPassword");
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
      await page.getByTestId("birthdate-input").fill("1990-12-31");
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
      await page.getByTestId("firstname-input").fill("John");
      await page.getByTestId("lastname-input").fill("Doe");
      await page.getByTestId("email-input").fill("john.doe");
      await page.getByTestId("birthdate-input").fill("1990-12-31");
      await page.getByRole("button", { name: "Done" }).click();
      await page.getByTestId("password-input").fill("extremlySecretPassword");
      await page.getByTestId("register-button").click();

      // Assert:
      await expect(page.locator("#octavalidate_email")).toHaveText(
        "Please provide a valid email address",
      );
    },
  );
});
