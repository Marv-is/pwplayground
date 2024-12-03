import { Page, Locator } from "@playwright/test";

export class DashboardPage {
  private page: Page;

  readonly dashboardContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardContainer = page.getByRole('heading', { name: 'Dashboard' })
  }
}
