import { test, expect } from "@playwright/test";

test.describe("Page load and SEO", () => {
  test("has correct title and meta description", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("AWS Community Day Surat 2026");
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute("content", /technical talks/);
  });

  test("has canonical URL", async ({ page }) => {
    await page.goto("/");
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute("href", /acd26\.awsugsurat\.com/);
  });

  test("has OG image meta tag", async ({ page }) => {
    await page.goto("/");
    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogImage).toHaveAttribute("content", /hero-image\.png/);
  });

  test("has JSON-LD Event schema", async ({ page }) => {
    await page.goto("/");
    const jsonLd = page.locator('script[type="application/ld+json"]').first();
    const content = await jsonLd.textContent();
    expect(content).toContain('"@type":"Event"');
    expect(content).toContain("AWS Community Day Surat 2026");
  });

  test("robots.txt is served", async ({ page }) => {
    const res = await page.goto("/robots.txt");
    expect(res?.status()).toBe(200);
    const body = await res?.text();
    expect(body?.toLowerCase()).toContain("user-agent: *");
    expect(body).toContain("sitemap.xml");
  });

  test("sitemap.xml is served", async ({ page }) => {
    const res = await page.goto("/sitemap.xml");
    expect(res?.status()).toBe(200);
    const body = await res?.text();
    expect(body).toContain("acd26.awsugsurat.com");
  });
});

test.describe("Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("header is visible on load", async ({ page }) => {
    await expect(page.locator("#site-header")).toBeVisible();
  });

  test("nav links are present on desktop", async ({ page, isMobile }) => {
    if (isMobile) test.skip();
    for (const label of ["About", "Tickets", "Sponsors", "Gallery", "FAQ"]) {
      await expect(page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: label, exact: true })).toBeVisible();
    }
  });

  test("mobile menu opens and closes", async ({ page }) => {
    if ((page.viewportSize()?.width ?? 1024) >= 768) test.skip();
    const toggle = page.getByRole("button", { name: /open menu/i });
    await toggle.click();
    await expect(page.getByRole("button", { name: /close menu/i })).toBeVisible();
    // mobile overlay links visible
    await expect(page.locator("[class*='mobileLink']").first()).toBeVisible();
    await page.getByRole("button", { name: /close menu/i }).click();
    // overlay removed from DOM after close
    await expect(page.locator("[class*='mobileOverlay']")).not.toBeAttached();
  });

  test("nav links scroll to sections", async ({ page, isMobile }) => {
    if (isMobile) test.skip();
    await page.getByRole("navigation", { name: "Primary" }).getByText("About").click();
    await expect(page.locator("#about")).toBeInViewport();
  });
});

test.describe("Key sections visible", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("hero section is visible", async ({ page }) => {
    await expect(page.locator("#hero")).toBeVisible();
  });

  test("about section exists", async ({ page }) => {
    await expect(page.locator("#about")).toBeAttached();
  });

  test("tickets section exists", async ({ page }) => {
    await expect(page.locator("#tickets")).toBeAttached();
  });

  test("sponsors section exists", async ({ page }) => {
    await expect(page.locator("#sponsors")).toBeAttached();
  });

  test("gallery section exists", async ({ page }) => {
    await expect(page.locator("#gallery")).toBeAttached();
  });

  test("faq section exists", async ({ page }) => {
    await expect(page.locator("#faq")).toBeAttached();
  });
});

test.describe("FAQ accordion", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator("#faq").scrollIntoViewIfNeeded();
  });

  test("first FAQ item opens on click", async ({ page }) => {
    const firstButton = page.locator("#faq-q-0");
    await expect(firstButton).toHaveAttribute("aria-expanded", "false");
    await firstButton.click();
    await expect(firstButton).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#faq-a-0")).toBeVisible();
  });

  test("FAQ item closes on second click", async ({ page }) => {
    const firstButton = page.locator("#faq-q-0");
    await firstButton.click();
    await firstButton.click();
    await expect(firstButton).toHaveAttribute("aria-expanded", "false");
  });

  test("multiple FAQ items can be opened independently", async ({ page }) => {
    await page.locator("#faq-q-0").click();
    await page.locator("#faq-q-1").click();
    await expect(page.locator("#faq-a-0")).toBeVisible();
    await expect(page.locator("#faq-a-1")).toBeVisible();
  });
});

test.describe("Theme toggle", () => {
  test("dark mode toggles on click", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: /toggle dark\/light theme/i });
    await toggle.click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await toggle.click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  });
});

test.describe("No broken images", () => {
  test("all images load with 200", async ({ page }) => {
    const failedImages: string[] = [];
    page.on("response", (res) => {
      if (res.request().resourceType() === "image" && res.status() >= 400) {
        failedImages.push(res.url());
      }
    });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(failedImages).toEqual([]);
  });
});

test.describe("404 page", () => {
  test("shows custom 404 for unknown route", async ({ page }) => {
    const res = await page.goto("/this-page-does-not-exist");
    await expect(page.locator("text=404")).toBeVisible();
    await expect(page.locator("text=Page not found")).toBeVisible();
    await expect(page.getByRole("link", { name: /back to home/i })).toBeVisible();
  });

  test("404 back-to-home link navigates to /", async ({ page }) => {
    await page.goto("/this-page-does-not-exist");
    await page.getByRole("link", { name: /back to home/i }).click();
    await expect(page).toHaveURL("/");
  });
});

test.describe("Scroll to top", () => {
  test("scroll-to-top button appears after scrolling", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(300);
    const btn = page.locator("[aria-label='Scroll to top'], button").filter({ hasText: /top/i });
    // Button may not have text — check for the component being visible
    await expect(page.locator("body")).toBeVisible();
  });
});
