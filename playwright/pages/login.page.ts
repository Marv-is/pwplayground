import { Page, Locator } from "@playwright/test";

export class LoginPage {
  private page: Page;

  readonly loginName: Locator;
  readonly loginPassword: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginName = page.getByTestId('username-input');
    this.loginPassword = page.getByTestId('password-input');
    this.loginButton = page.getByTestId('login-button');
  }
}

