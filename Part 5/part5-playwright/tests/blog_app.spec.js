import { test, expect, describe, beforeEach } from "@playwright/test";

// import and deconstruct helper funcs
// loginWith parses a username and password
import helpers from "./blog_helper.js";
const { loginWith } = helpers;

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    // add mock DB data
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "admin",
        username: "admin",
        password: "admin"
      }
    });

    // open the page
    await page.goto("");
  });

  test("login form is shown", async ({ page }) => {
    const loginButton = await page.getByRole("button", { name: "login" });
    expect(loginButton).toBeVisible();
  });

  describe("Login functionality tests", () => {
    test("valid credentials can log in", async ({ page }) => {
      await loginWith(page, "admin", "admin");
      await expect(page.getByText("Logged in as admin")).toBeVisible();
    });

    test("invalid credentials reject login", async ({ page }) => {
      await loginWith(page, "admin", "false-password");
      await expect(page.getByText("Invalid username or password")).toBeVisible();
      await expect(page.getByText("Logged in as admin")).not.toBeVisible();
    });
  });
});
