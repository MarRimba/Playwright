import { Locator, Page } from "@playwright/test";

export class RegisterPage {

  registerLink: Locator;
  firstNameInput: Locator;
  lastNameInput: Locator;
  emailInput: Locator;
  birthdayInput: Locator;
  buttonDone: Locator;
  passwordInput: Locator;
  registerButton: Locator;

  constructor(private page: Page) {
    this.registerLink = this.page.getByRole("link", { name: "Register" });
    this.firstNameInput = this.page.getByTestId("firstname-input");
    this.lastNameInput = this.page.getByTestId("lastname-input");
    this.emailInput = this.page.getByTestId("email-input");
    this.birthdayInput = this.page.getByTestId("birthdate-input");
    this.buttonDone = this.page.getByRole("button", { name: "Done" });
    this.passwordInput = this.page.getByTestId("password-input");
    this.registerButton = this.page.getByTestId("register-button");
  }
}
