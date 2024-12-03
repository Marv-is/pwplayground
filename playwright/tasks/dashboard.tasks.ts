import {DashboardPage} from "../pages/dashboard.page";
import {expect, Page} from "@playwright/test";

export class DashboardTasks{
  readonly dashboardPage: DashboardPage;

  constructor(page: Page) {
    this.dashboardPage = new DashboardPage(page);
  }

  async validateDashboard() {
    await expect(this.dashboardPage.dashboardContainer).toBeVisible();
  }
}
