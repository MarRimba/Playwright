import { Locator, Page } from "@playwright/test";

export class LoginPage {
  mouseHover: Locator;
  loginLink: Locator;
  loginInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;
  logoutButton: Locator;
  loginError: Locator;

  constructor(private page: Page) {
    this.mouseHover = this.page.getByTestId("btn-dropdown");
    this.loginLink = this.page.getByRole("link", { name: "Login" });
    this.loginInput = this.page.getByRole("textbox", {
      name: "Enter User Email",
    });
    this.passwordInput = this.page.getByRole("textbox", {
      name: "Enter Password",
    });
    this.loginButton = this.page.getByRole("button", { name: "LogIn" });
    this.logoutButton = this.page.getByTestId("logoutButton");
    this.loginError = this.page.getByTestId("login-error");
  }
}
