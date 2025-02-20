import { test, expect, describe, beforeEach } from "@playwright/test";

// import and deconstruct helper funcs
import helpers from "./helper.js";
const { loginWith, createNote } = helpers;

describe("Notes app", () => {
  beforeEach(async ({ page, request }) => {
    // add mock DB data
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "admin",
        username: "admin",
        password: "password"
      }
    });

    // open the page
    await page.goto("");
  });

  test("front page can be opened", async ({ page }) => {
    const locator = await page.getByText("Notes");
    await expect(locator).toBeVisible();
    await expect(page.getByText("Notes")).toBeVisible();
  });

  test("login form can be opened and user can log in", async ({ page }) => {
    await page.getByRole("button", { name: "login" }).click();

    await loginWith(page, "admin", "password");

    await expect(page.getByText("Logged in as admin")).toBeVisible();
  });

  test("login fails with wrong password", async ({ page }) => {
    await loginWith(page, "admin", "wrong_password");

    const notificationDiv = page.locator(".notification");
    await expect(notificationDiv).toContainText("Invalid username or password!");
    await expect(notificationDiv).toHaveCSS("background-color", "rgb(255, 0, 0)");

    await expect(page.getByText("Logged in as admin")).not.toBeVisible();
  });

  describe("Post login functionality", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "admin", "password");
    });

    describe("Note creation", () => {
      test("new note can be created", async ({ page }) => {
        await createNote(page, "a note created by Playwright");
        await expect(page.getByText("a note created by playwright")).toBeVisible();
      });
    });

    describe("Note details", () => {
      beforeEach(async ({ page }) => {
        await createNote(page, "A second note by playwright");
        await createNote(page, "A third note by playwright");
      });

      test("importance of a note can be changed", async ({ page }) => {
        // setting up the second note for testing
        const secondNoteElement = await page.getByText("A second note by playwright");
        const secondNoteButton = await secondNoteElement.locator("..");

        // setting up a third note for testing
        const thirdNoteElement = await page.getByText("A third note by playwright");

        await secondNoteButton.getByRole("button", { name: "make not important" }).click();
        await expect(secondNoteButton.getByText("make important")).toBeVisible();
      });
    });
  });
});
