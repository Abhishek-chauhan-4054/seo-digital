# Pytron Digital — SEO Website Analyzer

A production-grade, globally launchable SEO Report Generator built for **[digital.pytron.io](https://digital.pytron.io)** by **Pytron Digital**.

Target markets: **USA, Canada, UK, Australia, UAE, India, and international growth teams**.

---

## 🌟 Key Features

### 1. Real Multi-Source SEO Analysis (No Fake Results)
- **Primary Data Source — Google PageSpeed Insights & Lighthouse**:
  - Live Performance, SEO, Accessibility, and Best Practices audit scores.
  - Live **Core Web Vitals**: Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), First Contentful Paint (FCP), Total Blocking Time (TBT), Speed Index, and Time to First Byte (TTFB).
- **Server-Side Live DOM & On-Page Crawler**:
  - Live HTML `<title>` tag presence, character length, and truncation risk.
  - Live `<meta name="description">` length and search snippet readiness.
  - Live `<h1>`, `<h2>`, `<h3>` heading hierarchy and structure inspection.
  - Canonical URL (`<link rel="canonical">`) verification.
  - Search engine indexability and `noindex` / `nofollow` detection.
  - Real `/robots.txt` directive file verification.
  - Real `/sitemap.xml` existence and syntax verification.
  - Image audit: total inline images and missing `alt` accessibility attribute detection.
  - Internal vs. external link distribution and equity modeling.
  - Open Graph protocol meta tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`).
  - Twitter / X card metadata validation.
  - Structured Data: parses `<script type="application/ld+json">` for Schema.org entities (`Organization`, `WebSite`, `Product`, `Article`, etc.).
  - Responsive viewport `<meta name="viewport">` verification.
- **Truth in Reporting**:
  - Checks are categorized into 4 explicit statuses: **Verified** (passed live audit), **Warning** (optimization opportunity), **Failed** (critical issue), and **Not available** (if blocked or rate-limited).
  - Scores are never fabricated when third-party services are unavailable.

### 2. Extensible Provider Architecture (`SeoAnalyzerProvider`)
The architecture separates analysis providers from the report presentation layer:
```text
src/lib/seo/
  ├── types.ts                   # Normalized SeoReport data model & interfaces
  ├── security.ts                # SSRF protection & private IP address filter
  ├── scoring.ts                 # Scoring algorithms and grade calculations
  ├── exportUtils.ts             # Markdown, JSON, and PDF print generators
  ├── analyzer.ts                # Client-side analysis coordinator
  ├── analyzerService.ts         # Server-side multi-provider aggregation service
  └── providers/
      ├── OnPageProvider.ts      # Server-side live HTML parser & robots/sitemap checker
      └── LighthouseProvider.ts  # Google PageSpeed Insights & Lighthouse REST client
```
Future providers (Google Search Console, Ahrefs, Semrush, Bing Webmaster Tools, or custom Chromium headless crawlers) can be added by implementing `SeoAnalyzerProvider` without altering the frontend UI.

### 3. Enterprise Security & SSRF Protection
- Strict URL validation and normalization.
- Rejects loopback addresses (`127.0.0.1`, `localhost`), link-local IPs (`169.254.0.0/16`), private subnets (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`), IPv6 loopbacks (`::1`), and non-HTTP protocols.
- Server-side timeouts (with `AbortController`) prevent slow-hanging requests.
- Never exposes Google PageSpeed API keys to client browsers.

### 4. High-Converting UX & Monetization Engine
- **Report Export**:
  - Clean client-side Markdown text report download.
  - Raw JSON structured data export for developer teams.
  - Native print-optimized view (`@media print` CSS stylesheet) for instant PDF generation.
- **Deep Report Locked Experience**:
  - 8 locked preview cards teaser (Technical SEO Deep Dive, Page-by-Page Analysis, Keyword Opportunities, Content Gaps, Competitor Benchmarks, Internal Linking, Core Web Vitals, Priority Action Plan).
  - High-converting Lead Capture modal for Pytron Digital advisory services.

---

## 🚀 Getting Started

### Prerequisites
- Node.js `18.17+` or `20.x`
- npm `9+` or yarn / pnpm

### Installation

1. Clone or extract the project:
```bash
cd pytron-seo
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Configure Google PageSpeed API Key:
Create a `.env.local` file in the root directory:
```env
# Optional: Higher quota for Google PageSpeed Insights
PAGESPEED_API_KEY=your_google_api_key_here
```
*(Note: The application works out-of-the-box using Google's public unauthenticated PageSpeed tier if no key is provided.)*

4. Run development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

5. Build for production:
```bash
npm run build
npm start
```

---

## 🌐 Deploy to Vercel

The application is built for 1-click deployment on **Vercel**:
```bash
npx vercel
```
Or import the repository directly in the Vercel dashboard. All routes and server-side checks run natively within standard serverless function limits.

---

## 🏢 Brand & Organization
- **Product**: [digital.pytron.io](https://digital.pytron.io)
- **Company**: Pytron Digital
- **Domain**: SEO Intelligence, High-Performance Web Engineering, AI & Organic Growth
- **Contact**: contact@pytron.io

Copyright © 2026 Pytron Digital. All rights reserved.
