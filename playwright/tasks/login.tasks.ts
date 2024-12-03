import { LoginPage } from "../pages/login.page";
import {expect, Page} from "@playwright/test";

export class LoginTasks{
  readonly loginPage: LoginPage;

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
  }

  async login(username: string, password: string) {
    await this.loginPage.loginName.fill(username);
    await this.loginPage.loginPassword.fill(password);
    await this.loginPage.loginButton.click();
  }

  async checkLocator() {
    await expect(this.loginPage.loginName).toBeVisible();
    await expect(this.loginPage.loginPassword).toBeVisible();
    await expect(this.loginPage.loginButton).toBeVisible();
  }
}



