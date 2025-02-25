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

    test("posts are sorted by likes", async ({ page }) => {
      await createBlog(page, "Blog A", "the third most liked blog post", "www.bloga.com");
      await createBlog(page, "Blog B", "the least most liked blog post", "www.blogb.com");
      await createBlog(page, "Blog C", "the second most liked blog post", "www.blogc.com");

      const blogs = await page.locator(".blog-post").all();

      // handling first blog - the default "test blog for Playwright"
      await blogs[0].getByRole("button", { name: "View" }).click();
      for (let i = 0; i < 10; i++) {
        await blogs[0].getByRole("button", { name: "Like" }).click();
      }

      // handling "Blog A" - 3rd most likes
      await blogs[1].getByRole("button", { name: "View" }).click();
      for (let i = 0; i < 3; i++) {
        await blogs[1].getByRole("button", { name: "Like" }).click();
      }

      // bumping C above B
      await blogs[3].getByRole("button", { name: "View" }).click();
      await blogs[3].getByRole("button", { name: "Like" }).click();

      // handling "Blog C" - 2nd most likes
      await blogs[2].getByRole("button", { name: "View" }).click();
      for (let i = 0; i < 4; i++) {
        await blogs[2].getByRole("button", { name: "Like" }).click();
      }

      // learn to double-use locator ;)
      // you can check for .blog-post, the index of that item, and then check
      // for a further locator at .blog-content!
      const firstBlog = page.locator(".blog-post").first().locator(".blog-content");
      await expect(firstBlog).toHaveText("a test blog written for playwright");

      const secondBlog = page.locator(".blog-post").nth(1).locator(".blog-content");
      await expect(secondBlog).toHaveText("the second most liked blog post");

      const thirdBlog = page.locator(".blog-post").nth(2).locator(".blog-content");
      await expect(thirdBlog).toHaveText("the third most liked blog post");

      const lastBlog = page.locator(".blog-post").last().locator(".blog-content");
      await expect(lastBlog).toHaveText("the least most liked blog post");
    });
  });
});
