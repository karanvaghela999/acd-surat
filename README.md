# AWS Community Day Surat 2026

Website for **AWS Community Day Surat 2026**, organised by AWS User Group Surat.

**Live site:** https://acd26.awsugsurat.com

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, static export) |
| Language | TypeScript |
| Hosting | S3 + CloudFront |
| DNS | Route 53 (subdomain of awsugsurat.com) |
| CI/CD | GitHub Actions |
| Monitoring | CloudWatch + SNS |
| E2E tests | Playwright |

---

## Local development

```bash
npm install
npm run dev        # starts on http://localhost:3000
```

> The dev server uses Next.js image optimisation. The production build uses `output: 'export'` with `images.unoptimized: true` for static S3 hosting — behaviour is equivalent.

---

## Attendee badge

Visit `/badge` for the standalone attendee badge studio, linked from the main website's desktop and mobile navigation. Photos are processed locally, converted to grayscale, and exported at 1200 × 1500 with a dark-slate and sage geometric canvas frame and existing AWS logos. JPG, PNG and WebP files up to 20 MB / 60 megapixels are supported, with zoom and position controls.

File sharing uses the device share sheet when supported (HTTPS required). X and LinkedIn links share the live event homepage; users attach their downloaded image. WhatsApp's message link prefills the caption and URL, and Instagram's link opens Instagram. Each platform offers a same-tab fallback for blocked new tabs. Separate Instagram image/story and WhatsApp Status buttons use the share sheet or download fallback; a website cannot automatically post to a user's status/story. The caption is available to copy separately. Browser tests intercept outbound destinations and verify navigation, not authenticated posting on third-party platforms.

The deployment workflow publishes `/badge` aliases for S3, and the image CSP allows `blob:` for local photo previews. No upload server or storage is needed.

Run the feature checks with `npx playwright test tests/badge.spec.ts` (install browsers first with `npx playwright install`).

## Building

```bash
npm run build      # generates static output in ./out
```

The `./out` directory is what gets deployed to S3.

---

## E2E tests

[Playwright](https://playwright.dev) tests run across three device profiles:

| Profile | Device | Viewport |
|---|---|---|
| desktop | Chrome | 1440 × 900 |
| tablet | iPad Pro 11 | 834 × 1194 |
| mobile | iPhone 14 | 390 × 844 |

```bash
npx playwright test              # run all tests
npx playwright test --ui         # interactive mode
npx playwright test --grep "SEO" # run a specific group
```

Tests cover: SEO meta tags, `robots.txt`, `sitemap.xml`, navigation, all page sections, FAQ accordion, theme toggle, 404 page, and broken image detection.

**Production smoke tests** (run against the live site):

```bash
BASE_URL=https://acd26.awsugsurat.com npx playwright test tests/production.spec.ts
```

Checks: security response headers (HSTS, CSP, X-Frame-Options, etc.), correct HTTP status codes, and basic page load.

---

## Deployment

Deployments are automatic on every push to `main` via GitHub Actions (`.github/workflows/deploy.yml`):

1. `npm ci` — install dependencies
2. `npm run build` — static export to `./out`
3. `aws s3 sync ./out s3://acd26.awsugsurat.com --delete` — sync to S3
4. CloudFront invalidation on `/*`

The workflow authenticates to AWS via OIDC (no long-term keys) using the role `github-actions-acd26-deploy`.

---

## AWS infrastructure

| Resource | Detail |
|---|---|
| S3 bucket | `acd26.awsugsurat.com` — ap-south-1, private, OAC access only |
| CloudFront | Distribution `E2AWA32IPHA0UU` — alias `acd26.awsugsurat.com` |
| ACM certificate | us-east-1, DNS-validated |
| Route 53 | A-alias record in `awsugsurat.com` hosted zone |
| CloudWatch dashboard | `acd26-website` — requests, bandwidth, error rates |
| CloudWatch alarms | 5 alarms → SNS `acd26-website-alerts` → `np@ciropsconsulting.com` |

### CloudFront error handling

| S3 response | CloudFront serves | HTTP status |
|---|---|---|
| 403 (missing key) | `/404.html` | 404 |
| 404 | `/404.html` | 404 |

---

## Project structure

```
src/
  app/
    layout.tsx          # metadata, JSON-LD schemas, fonts
    page.tsx            # single-page layout
    not-found.tsx       # custom 404 page
    robots.ts           # generates /robots.txt
    sitemap.ts          # generates /sitemap.xml
    globals.css         # design system tokens
  components/           # Hero, Header, About, Tickets, FAQ, etc.
public/                 # static assets (images, SVGs)
tests/
  site.spec.ts          # Playwright E2E tests
playwright.config.ts    # test config (3 device profiles)
.github/
  workflows/
    deploy.yml          # CI/CD pipeline
```
