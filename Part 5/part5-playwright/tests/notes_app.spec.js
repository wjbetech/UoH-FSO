import { test, expect, describe, beforeEach } from "@playwright/test"

describe("Notes app", () => {
  
  beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/login")
  })

  describe("Basic app functionality: ", () => {

    test("front page can be opened", async ({ page }) => {  
      const locator = await page.getByText("Notes")
      await expect(locator).toBeVisible()
      await expect(page.getByText("TypeScript has benefits over JavaScript")).toBeVisible()
    })
  
    test("login form can be opened", async ({ page}) => {
      await page.getByRole("button", { name: "login"}).click()
  
      const inputFields = await page.getByRole("textbox").all()
      await inputFields[0].fill("admin")
      await inputFields[1].fill("password")
      await page.getByRole("button", { name: "login"}).click()
  
      await expect(page.getByText("Logged in as will")).toBeVisible()
    })
  })

  describe("Note creation", () => {
    beforeEach(async ({ page }) => {
      await page.getByRole("button", { name: "Login" }).click()

      await page.getByTestId("username").fill("admin")
      await page.getByTestId("password").fill("password")

      await page.getByRole("button", { name: "Login" }).click()
    })

    test("new note can be created", async ({ page }) => {
      await page.getByRole("button", { name: "+ Add Note" }).click()
      await page.getByRole("textbox").fill("a note created by Playwright")
      await page.getByRole("button", { name: "Save" }).click()
      await expect(page.getByText("a note created by Playwright")).toBeVisible()
    })
  })

})
