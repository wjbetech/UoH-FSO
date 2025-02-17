import { test, expect, describe, beforeEach } from "@playwright/test";

describe("Notes app", () => {
  beforeEach(async ({ page, request }) => {
    // add mock DB data
    await request.post("http://localhost:3001/api/testing/reset");
    await request.post("http://localhost:3001/api/users", {
      data: {
        name: "admin",
        username: "admin",
        password: "password"
      }
    });

    // open the page
    await page.goto("http://localhost:5173/login");
  });

  test("front page can be opened", async ({ page }) => {
    const locator = await page.getByText("Notes");
    await expect(locator).toBeVisible();
    await expect(page.getByText("Notes")).toBeVisible();
  });

  test("login form can be opened and user can log in", async ({ page }) => {
    await page.getByRole("button", { name: "login" }).click();

    const inputFields = await page.getByRole("textbox").all();
    await inputFields[0].fill("admin");
    await inputFields[1].fill("password");
    await page.getByRole("button", { name: "login" }).click();

    await expect(page.getByText("Logged in as admin")).toBeVisible();
  });

  test("login fails with wrong password", async ({ page }) => {
    await page.getByRole("button", { name: "login" }).click();
    await page.getByTestId("username").fill("admin");
    await page.getByTestId("password").fill("wrong_password");
    await page.getByRole("button", { name: "login " }).click();

    const notificationDiv = page.locator(".notification");
    await expect(notificationDiv).toContainText("Invalid username or password!");
    await expect(notificationDiv).toHaveCSS("background-color", "rgb(255, 0, 0)");

    await expect(page.getByText("Logged in as admin")).not.toBeVisible();
  });

  describe("Post login functionality", () => {
    beforeEach(async ({ page }) => {
      await page.getByRole("button", { name: "Login" }).click();

      await page.getByTestId("username").fill("admin");
      await page.getByTestId("password").fill("password");

      await page.getByRole("button", { name: "Login" }).click();
    });

    describe("Note creation", () => {
      test("new note can be created", async ({ page }) => {
        await page.getByRole("button", { name: "+ Add Note" }).click();
        await page.getByRole("textbox").fill("a note created by Playwright");
        await page.getByRole("button", { name: "Save" }).click();
        await expect(page.getByText("a note created by Playwright")).toBeVisible();
      });
    });

    describe("Note details", () => {
      beforeEach(async ({ page }) => {
        await page.getByRole("button", { name: "+ Add Note" }).click();
        await page.getByRole("textbox").fill("another new note in Playwright");
        await page.getByRole("button", { name: "Save" }).click();
      });

      test("importance of a note can be changed", async ({ page }) => {
        await page.getByRole("button", { name: "make not important" }).click();
        await expect(page.getByText("make important")).toBeVisible();
      });
    });
  });
});
