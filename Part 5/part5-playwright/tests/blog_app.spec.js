import { test, expect, describe, beforeEach } from "@playwright/test";

describe("Blog app", () => {
  beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("login form is shown", async ({ page }) => {
    const loginButton = await page.getByRole("button", { name: "login" });
    expect(loginButton).toBeVisible();
  });
});
