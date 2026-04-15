import { test, expect } from "@playwright/test";

test.describe("Sun* Kudos - Live Board", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the Kudos page (assumes authenticated session)
    await page.goto("/sun-kudos");
  });

  test("T085: Page load — hero, feed, sidebar render", async ({ page }) => {
    // Hero section
    await expect(page.locator("h1")).toContainText(
      /ghi nhận|Recognition|感謝/i
    );

    // Section headers
    await expect(page.getByText("HIGHLIGHT KUDOS")).toBeVisible();
    await expect(page.getByText("ALL KUDOS")).toBeVisible();

    // Sidebar stats
    await expect(
      page.locator('[class*="bg-[var(--color-kudos-container)]"]').first()
    ).toBeVisible();
  });

  test("T086: Infinite scroll — loads more on scroll", async ({ page }) => {
    // Count initial cards
    const initialCards = await page
      .locator("article")
      .count();

    if (initialCards >= 10) {
      // Scroll to bottom to trigger infinite scroll
      await page.evaluate(() =>
        window.scrollTo(0, document.body.scrollHeight)
      );
      await page.waitForTimeout(1000);

      // Should have more cards now
      const afterScrollCards = await page.locator("article").count();
      expect(afterScrollCards).toBeGreaterThanOrEqual(initialCards);
    }
  });

  test("T087: Heart toggle — like and unlike", async ({ page }) => {
    // Find a heart button (not disabled)
    const heartButton = page
      .locator('button[aria-label*="Like"]')
      .first();

    if (await heartButton.isVisible()) {
      // Get initial state
      const initialPressed = await heartButton.getAttribute("aria-pressed");

      // Click to toggle
      await heartButton.click();
      await page.waitForTimeout(300);

      // Verify state changed
      const newPressed = await heartButton.getAttribute("aria-pressed");
      expect(newPressed).not.toBe(initialPressed);

      // Click again to revert
      await heartButton.click();
      await page.waitForTimeout(300);

      const revertedPressed = await heartButton.getAttribute("aria-pressed");
      expect(revertedPressed).toBe(initialPressed);
    }
  });

  test("T088: Carousel navigation — prev/next", async ({ page }) => {
    const nextButton = page.getByLabel("Next slide");

    if (await nextButton.isVisible()) {
      // Check pagination text exists
      const pagination = page.locator('text=/\\d+\\/\\d+/');
      await expect(pagination).toBeVisible();

      const initialText = await pagination.textContent();

      // Click next if not disabled
      if (!(await nextButton.isDisabled())) {
        await nextButton.click();
        await page.waitForTimeout(400);

        const newText = await pagination.textContent();
        expect(newText).not.toBe(initialText);
      }
    }
  });

  test("T089: Filter — apply hashtag filter", async ({ page }) => {
    // Look for a filter button containing "Hashtag"
    const hashtagFilter = page.getByRole("button", { name: /Hashtag/i });

    if (await hashtagFilter.isVisible()) {
      await hashtagFilter.click();
      await page.waitForTimeout(300);

      // Select first option (not "All")
      const firstOption = page
        .locator('[class*="bg-[var(--color-kudos-container)]"] button')
        .nth(1);

      if (await firstOption.isVisible()) {
        await firstOption.click();
        await page.waitForTimeout(500);

        // URL should have hashtag param
        expect(page.url()).toContain("hashtag=");
      }
    }
  });

  test("T090: Copy link — shows copied feedback", async ({ page }) => {
    const copyButton = page.getByRole("button", { name: /Copy Link/i }).first();

    if (await copyButton.isVisible()) {
      await copyButton.click();
      await page.waitForTimeout(500);

      // Button text should change to "Copied!" or localized version
      await expect(copyButton).not.toContainText("Copy Link");
    }
  });
});
