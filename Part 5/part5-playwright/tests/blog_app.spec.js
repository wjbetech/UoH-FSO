import { test, expect, describe, beforeEach } from "@playwright/test";

// import and deconstruct helper funcs
// loginWith parses a username and password
import helpers from "./blog_helper.js";
const { loginWith, createBlog } = helpers;

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

  describe("Post-login functionality tests", () => {
    test("new post can be created", async ({ page }) => {
      await loginWith(page, "admin", "admin");
      await createBlog(page, "test blog for Playwright", "a test blog written for playwright", "www.wjbeblog.com");
      await expect(page.getByText("test blog for Playwright")).toBeVisible();
    });
  });

  describe("Blog post functionality", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "admin", "admin");
      await createBlog(page, "test blog for Playwright", "a test blog written for playwright", "www.wjbeblog.com");
    });

    test("a blog can be liked", async ({ page }) => {
      // open the blog details, find like button, click like
      await page.getByRole("button", { name: "View" }).click();
      await page.getByRole("button", { name: "Like" }).click();
      await expect(page.getByText("Likes: 1")).toBeVisible();
      await page.getByRole("button", { name: "Like" }).click();
      await expect(page.getByText("Likes: 2")).toBeVisible();
    });

    test("a blog can be deleted", async ({ page }) => {
      // define handling the dialog first
      page.on("dialog", async (dialog) => {
        expect(dialog.message()).toContain("Are you sure you want to delete a test blog written for playwright");
        await dialog.accept();
      });

      await page.getByRole("button", { name: "View" }).click();
      await page.getByRole("button", { name: "Delete" }).click();
      await expect(page.getByText("test blog for Playwright")).not.toBeVisible();
    });

    test("delete button is only visible to the user who wrote it", async ({ page }) => {
      await page.getByRole("button", { name: "View" }).click();
      await expect(page.getByRole("button", { name: "Delete" })).toBeVisible();

      await page.getByRole("button", { name: "Logout" }).click();
      await expect(page.getByRole("button", { name: "Delete" })).not.toBeVisible();
    });
  });
});
