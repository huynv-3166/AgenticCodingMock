import { test, expect } from "@playwright/test";

test.describe("Login Page", () => {
  test("renders login page with all key elements", async ({ page }) => {
    await page.goto("/login");

    // Header with logo
    await expect(
      page.getByAltText("Sun Annual Awards 2025")
    ).toBeVisible();

    // Login button
    await expect(
      page.getByRole("button", { name: "Login with Google" })
    ).toBeVisible();

    // Footer copyright
    await expect(
      page.getByText("Bản quyền thuộc về Sun* © 2025")
    ).toBeVisible();
  });

  test("login button is clickable", async ({ page }) => {
    await page.goto("/login");

    const button = page.getByRole("button", { name: "Login with Google" });
    await expect(button).toBeEnabled();
  });

  test("unauthenticated user accessing / is redirected to /login", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/login/);
  });
});
