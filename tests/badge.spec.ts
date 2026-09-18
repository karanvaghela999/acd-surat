import { test, expect } from "@playwright/test";

test("platform links open correct destinations and offer same-tab fallback", async ({ page, context }) => {
  // Stop at the outbound navigation: tests must never publish to real accounts.
  await context.route(/https:\/\/(x\.com|www\.linkedin\.com|wa\.me|www\.instagram\.com)\//, (route) => route.fulfill({ body: "Platform destination" }));
  await page.goto("/badge");
  for (const [label, host] of [["Post on X ↗", "x.com"], ["WhatsApp message ↗", "wa.me"], ["Open Instagram ↗", "www.instagram.com"]]) {
    const link = page.getByRole("link", { name: label, exact: true });
    const href = (await link.getAttribute("href"))!;
    const url = new URL(href);
    expect(url.hostname).toBe(host);
    if (host === "x.com" || host === "www.linkedin.com") expect(url.searchParams.get("url")).toBe("https://acd26.awsugsurat.com/");
    if (host === "wa.me") expect(url.searchParams.get("text")).toContain("#AWSCommunityDay");
    const popupPromise = page.waitForEvent("popup");
    await link.click();
    const popup = await popupPromise;
    await popup.waitForURL(href);
    await popup.close();
    const fallback = page.getByRole("link", { name: /didn’t open/ });
    await expect(fallback).toHaveAttribute("href", href);
    await expect(fallback).toHaveAttribute("target", "_self");
  }
  await page.getByRole("link", { name: /didn’t open/ }).click();
  await expect(page).toHaveURL("https://www.instagram.com/");
});

test("badge upload, grayscale export, crop and sharing fallbacks", async ({ page }, testInfo) => {
  await page.goto("/badge");
  await expect(page).toHaveTitle(/Create your attendee badge/);
  await expect(page.getByRole("button", { name: "Download badge" })).toBeDisabled();
  await expect(page.getByLabel("Zoom", { exact: true })).toBeDisabled();
  // A colourful, wide fixture exercises crop positioning and grayscale conversion.
  const data = await page.evaluate(() => {
    const c = document.createElement("canvas"); c.width = 1600; c.height = 900;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "red"; ctx.fillRect(0, 0, 800, 900);
    ctx.fillStyle = "lime"; ctx.fillRect(800, 0, 800, 900);
    return c.toDataURL("image/png").split(",")[1];
  });
  await page.getByLabel("Upload your photo", { exact: true }).setInputFiles({ name: "portrait.png", mimeType: "image/png", buffer: Buffer.from(data, "base64") });
  const downloadButton = page.getByRole("button", { name: "Download badge" });
  await expect(downloadButton).toBeEnabled();
  const pixels = await page.locator("canvas").evaluate((c: HTMLCanvasElement) => {
    const ctx = c.getContext("2d")!;
    return { photo: Array.from(ctx.getImageData(600, 700, 1, 1).data), frame: Array.from(ctx.getImageData(30, 1400, 1, 1).data) };
  });
  expect(pixels.photo[0]).toBe(pixels.photo[1]);
  expect(pixels.photo[1]).toBe(pixels.photo[2]);
  expect(pixels.frame[0]).not.toBe(pixels.frame[1]);
  const before = await page.locator("canvas").evaluate((c: HTMLCanvasElement) => c.toDataURL());
  await page.getByLabel("Horizontal position", { exact: true }).fill("0");
  await expect(downloadButton).toBeEnabled();
  const after = await page.locator("canvas").evaluate((c: HTMLCanvasElement) => c.toDataURL());
  expect(after).not.toBe(before);
  await page.getByRole("button", { name: "Reset crop" }).click();
  await expect(downloadButton).toBeEnabled();
  const download = page.waitForEvent("download");
  await downloadButton.click();
  const saved = await download;
  expect(saved.suggestedFilename()).toBe("aws-community-day-surat-2026.png");
  await saved.saveAs(testInfo.outputPath("badge.png"));
  await expect(page.getByRole("link", { name: "Post on X" })).toHaveAttribute("href", /intent\/tweet\?text=/);
  await expect(page.getByRole("button", { name: "LinkedIn badge + caption" })).toBeEnabled();
  await page.evaluate(() => Object.defineProperty(navigator, "canShare", { configurable: true, value: undefined }));
  const fallback = page.waitForEvent("download");
  await page.getByRole("button", { name: "WhatsApp Status" }).click();
  await fallback;
  await expect(page.locator('p[role="status"]')).toContainText("Updates → Add status");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  await page.screenshot({ path: testInfo.outputPath("badge-page.png"), fullPage: true });
});

test("rejects invalid uploads and recovers after a corrupt photo", async ({ page }) => {
  await page.goto("/badge");
  const input = page.getByLabel("Upload your photo", { exact: true });
  await input.setInputFiles({ name: "document.txt", mimeType: "text/plain", buffer: Buffer.from("test") });
  await expect(page.getByRole("main").getByRole("alert")).toContainText("JPG, PNG or WebP");
  await input.setInputFiles({ name: "bad.png", mimeType: "image/png", buffer: Buffer.from("not an image") });
  await expect(page.getByRole("main").getByRole("alert")).toContainText("could not be opened");
  await input.setInputFiles("public/volunteers/img1.jpeg");
  await expect(page.getByRole("button", { name: "Download badge" })).toBeEnabled();
  await expect(page.getByRole("main").getByRole("alert")).toHaveCount(0);
});

test("shares the generated file and handles cancellation", async ({ page }, testInfo) => {
  await page.goto("/badge");
  await page.getByLabel("Upload your photo", { exact: true }).setInputFiles("public/volunteers/img1.jpeg");
  const share = page.getByRole("button", { name: "Share image", exact: false });
  await expect(share).toBeEnabled();
  await page.screenshot({ path: testInfo.outputPath("portrait-preview.png"), fullPage: true });
  await page.evaluate(() => {
    Object.defineProperty(navigator, "canShare", { configurable: true, value: () => true });
    Object.defineProperty(navigator, "share", { configurable: true, value: async (data: ShareData) => {
      if (data.files?.[0]?.type !== "image/png" || !data.files[0].size) throw new Error("Missing badge");
    } });
  });
  await share.click();
  await expect(page.locator('p[role="status"]')).toContainText("Share sheet closed");
  await page.evaluate(() => Object.defineProperty(navigator, "share", { configurable: true, value: async () => { throw new DOMException("Cancelled", "AbortError"); } }));
  await share.click();
  await expect(share).toBeEnabled();
  await expect(page.getByRole("main").getByRole("alert")).toHaveCount(0);
});
