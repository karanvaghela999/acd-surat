/**
 * Production smoke tests — run against the live site.
 * Usage: BASE_URL=https://acd26.awsugsurat.com npx playwright test tests/production.spec.ts
 */
import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL ?? "https://acd26.awsugsurat.com";

test.describe("Security headers", () => {
  let headers: Record<string, string>;

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    const res = await page.goto(BASE_URL);
    headers = Object.fromEntries(
      Object.entries(res?.headers() ?? {}).map(([k, v]) => [k.toLowerCase(), v])
    );
    await page.close();
  });

  test("Strict-Transport-Security is set", () => {
    expect(headers["strict-transport-security"]).toContain("max-age=63072000");
    expect(headers["strict-transport-security"]).toContain("includeSubDomains");
  });

  test("X-Content-Type-Options is nosniff", () => {
    expect(headers["x-content-type-options"]).toBe("nosniff");
  });

  test("X-Frame-Options is DENY", () => {
    expect(headers["x-frame-options"]).toBe("DENY");
  });

  test("Referrer-Policy is set", () => {
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  });

  test("Content-Security-Policy is set", () => {
    expect(headers["content-security-policy"]).toContain("default-src 'self'");
    expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
    expect(headers["content-security-policy"]).toContain("object-src 'none'");
  });

  test("Permissions-Policy is set", () => {
    expect(headers["permissions-policy"]).toContain("camera=()");
    expect(headers["permissions-policy"]).toContain("microphone=()");
    expect(headers["permissions-policy"]).toContain("geolocation=()");
  });
});

test.describe("Production smoke", () => {
  test("site loads with correct title", async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle("AWS Community Day Surat 2026");
  });

  test("robots.txt is accessible", async ({ page }) => {
    const res = await page.goto(`${BASE_URL}/robots.txt`);
    expect(res?.status()).toBe(200);
  });

  test("sitemap.xml is accessible", async ({ page }) => {
    const res = await page.goto(`${BASE_URL}/sitemap.xml`);
    expect(res?.status()).toBe(200);
  });

  test("404 returns correct status", async ({ page }) => {
    const res = await page.goto(`${BASE_URL}/does-not-exist`);
    expect(res?.status()).toBe(404);
    await expect(page.locator("text=404")).toBeVisible();
  });
});
