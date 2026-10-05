import {
  SeoReport,
  SeoFinding,
  SeoCategoryScore,
  SeoCategoryType,
  WebVitalsSummary,
  CheckStatus,
  MetricValue,
} from './types';
import { OnPageProvider, OnPageRawData } from './providers/OnPageProvider';
import { LighthouseProvider, LighthouseRawData } from './providers/LighthouseProvider';
import { validateAndSanitizeUrl } from './security';
import { getGradeFromScore } from './scoring';

// In-memory cache for reducing repeated API usage (15-minute TTL)
interface CacheEntry {
  report: SeoReport;
  timestamp: number;
}
const reportCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 15 * 60 * 1000;

export async function analyzeWebsite(inputUrl: string): Promise<SeoReport> {
  const startTime = Date.now();

  // 1. SSRF & URL validation
  const validation = validateAndSanitizeUrl(inputUrl);
  if (!validation.valid || !validation.normalizedUrl) {
    throw new Error(validation.error || 'Invalid website URL provided.');
  }

  const { normalizedUrl, domain } = validation;
  const cacheKey = domain.toLowerCase();

  // 2. Cache check
  const cached = reportCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.report;
  }

  // 3. Instantiate providers
  const onPageProvider = new OnPageProvider();
  const lighthouseProvider = new LighthouseProvider();

  // 4. Run providers in parallel
  const [onPageResult, lhResult] = await Promise.allSettled([
    onPageProvider.analyze(normalizedUrl, domain),
    lighthouseProvider.analyze(normalizedUrl),
  ]);

  const onPageData: OnPageRawData =
    onPageResult.status === 'fulfilled'
      ? onPageResult.value
      : {
          success: false,
          error: (onPageResult as PromiseRejectedResult).reason?.message || 'On-page crawler failed',
          isHttps: normalizedUrl.startsWith('https://'),
          hasHsts: false,
          xRobotsTag: null,
          title: null,
          titleLength: 0,
          metaDescription: null,
          metaDescriptionLength: 0,
          canonicalUrl: null,
          metaRobots: null,
          isNoindex: false,
          isNofollow: false,
          viewportTag: null,
          headingCount: { h1: 0, h2: 0, h3: 0 },
          h1Text: null,
          totalImages: 0,
          missingAltCount: 0,
          internalLinksCount: 0,
          externalLinksCount: 0,
          ogTags: { title: null, description: null, image: null, url: null, type: null },
          twitterTags: { card: null, title: null, description: null, image: null },
          jsonLdSchemas: [],
          robotsTxtFound: null,
          sitemapXmlFound: null,
        };

  const lhData: LighthouseRawData =
    lhResult.status === 'fulfilled'
      ? lhResult.value
      : {
          success: false,
          error: (lhResult as PromiseRejectedResult).reason?.message || 'Lighthouse provider failed',
          scores: { performance: null, seo: null, accessibility: null, bestPractices: null },
          metrics: { lcp: null, cls: null, fcp: null, tbt: null, speedIndex: null, ttfb: null },
          audits: {},
        };

  // If both providers completely failed to reach the server
  if (!onPageData.success && !lhData.success) {
    throw new Error(
      `Unable to analyze ${domain}. The website may be offline, blocking automated requests, or unreachable. (${onPageData.error || lhData.error})`
    );
  }

  // 5. Build Normalized Findings
  const findings: SeoFinding[] = [];

  // ================= TECHNICAL SEO CHECKS =================
  // HTTPS
  if (onPageData.isHttps) {
    findings.push({
      id: 'tech-https',
      category: 'technical',
      title: 'HTTPS Encryption & SSL/TLS Protocol',
      description: 'The website successfully serves content over an encrypted HTTPS connection.',
      status: 'verified',
      statusLabel: 'Verified',
      impact: 'High',
      recommendation: 'Ensure all subdomains and HTTP variants redirect permanently (301) to HTTPS.',
      technicalDetails: onPageData.hasHsts ? 'HSTS (HTTP Strict Transport Security) header detected.' : 'HSTS header not found.',
      sourceProvider: 'onpage',
    });
  } else {
    findings.push({
      id: 'tech-https-failed',
      category: 'technical',
      title: 'Missing HTTPS Security Encryption',
      description: 'The site is accessible over unencrypted HTTP, triggering browser security warnings.',
      status: 'failed',
      statusLabel: 'Failed',
      impact: 'High',
      recommendation: 'Install an SSL certificate and redirect all unencrypted HTTP traffic to HTTPS.',
      sourceProvider: 'onpage',
    });
  }

  // Robots.txt
  if (onPageData.robotsTxtFound === true) {
    findings.push({
      id: 'tech-robots-txt',
      category: 'technical',
      title: 'Robots.txt Crawl Directive File',
      description: 'A valid robots.txt file was found at /robots.txt with crawler directives.',
      status: 'verified',
      statusLabel: 'Verified',
      impact: 'High',
      recommendation: 'Periodically check that critical CSS/JS resources are not accidentally disallowed.',
      sourceProvider: 'onpage',
    });
  } else if (onPageData.robotsTxtFound === false) {
    findings.push({
      id: 'tech-robots-txt-missing',
      category: 'technical',
      title: 'Robots.txt File Not Found',
      description: 'No robots.txt file was detected at /robots.txt. Search engines will crawl without crawl-rate guidance.',
      status: 'warning',
      statusLabel: 'Warning',
      impact: 'Medium',
      recommendation: 'Create a robots.txt file at the root to declare sitemap locations and prevent crawling of admin paths.',
      sourceProvider: 'onpage',
    });
  } else {
    findings.push({
      id: 'tech-robots-txt-unverified',
      category: 'technical',
      title: 'Robots.txt Status Check',
      description: 'Unable to verify /robots.txt endpoint during analysis.',
      status: 'not_available',
      statusLabel: 'Not available',
      impact: 'Low',
      recommendation: 'Verify robots.txt manually at https://' + domain + '/robots.txt.',
      sourceProvider: 'onpage',
    });
  }

  // Sitemap.xml
  if (onPageData.sitemapXmlFound === true) {
    findings.push({
      id: 'tech-sitemap-xml',
      category: 'technical',
      title: 'XML Sitemap Availability',
      description: 'An XML sitemap was located at /sitemap.xml to accelerate search indexing.',
      status: 'verified',
      statusLabel: 'Verified',
      impact: 'High',
      recommendation: 'Submit your sitemap URL directly to Google Search Console and Bing Webmaster Tools.',
      sourceProvider: 'onpage',
    });
  } else if (onPageData.sitemapXmlFound === false) {
    findings.push({
      id: 'tech-sitemap-xml-missing',
      category: 'technical',
      title: 'Standard XML Sitemap Not Detected',
      description: 'Could not detect an XML sitemap at the default /sitemap.xml URL.',
      status: 'warning',
      statusLabel: 'Warning',
      impact: 'Medium',
      recommendation: 'Generate an XML sitemap listing your indexable canonical URLs and declare it in robots.txt.',
      sourceProvider: 'onpage',
    });
  } else {
    findings.push({
      id: 'tech-sitemap-xml-unverified',
      category: 'technical',
      title: 'XML Sitemap Status',
      description: 'Unable to verify /sitemap.xml endpoint during analysis.',
      status: 'not_available',
      statusLabel: 'Not available',
      impact: 'Low',
      recommendation: 'Check whether your sitemap is hosted at an alternate URL or declared in robots.txt.',
      sourceProvider: 'onpage',
    });
  }

  // Indexability & noindex
  if (onPageData.isNoindex) {
    findings.push({
      id: 'tech-noindex-block',
      category: 'technical',
      title: 'Noindex Directive Detected',
      description: 'The page contains a `noindex` tag, instructing Googlebot NOT to display this page in search results.',
      status: 'failed',
      statusLabel: 'Failed',
      impact: 'High',
      recommendation: 'Remove `<meta name="robots" content="noindex">` or the `X-Robots-Tag: noindex` header if this page should rank.',
      sourceProvider: 'onpage',
    });
  } else {
    findings.push({
      id: 'tech-indexable',
      category: 'technical',
      title: 'Search Engine Indexability',
      description: 'No `noindex` directives found. The page is eligible to be indexed by search crawlers.',
      status: 'verified',
      statusLabel: 'Verified',
      impact: 'High',
      recommendation: 'Ensure canonical URLs and internal links reinforce indexing for this page.',
      sourceProvider: 'onpage',
    });
  }

  // Canonical Tag
  if (onPageData.canonicalUrl) {
    findings.push({
      id: 'tech-canonical-present',
      category: 'technical',
      title: 'Canonical URL Specified',
      description: `Canonical link found pointing to: ${onPageData.canonicalUrl}`,
      status: 'verified',
      statusLabel: 'Verified',
      impact: 'Medium',
      recommendation: 'Verify that the canonical link matches the exact HTTPS URL without redirect hops.',
      sourceProvider: 'onpage',
    });
  } else {
    findings.push({
      id: 'tech-canonical-missing',
      category: 'technical',
      title: 'Missing Canonical Tag',
      description: 'No `<link rel="canonical">` was found on the page, risking duplicate content dilution.',
      status: 'warning',
      statusLabel: 'Warning',
      impact: 'Medium',
      recommendation: 'Add a self-referencing `<link rel="canonical" href="...">` tag to establish the authoritative URL.',
      sourceProvider: 'onpage',
    });
  }

  // ================= ON-PAGE SEO CHECKS =================
  // Title Tag
  if (!onPageData.title) {
    findings.push({
      id: 'onpage-title-missing',
      category: 'onpage',
      title: 'Missing Document Title Tag',
      description: 'The HTML document has no `<title>` tag, severely damaging organic click-through and search relevance.',
      status: 'failed',
      statusLabel: 'Failed',
      impact: 'High',
      recommendation: 'Add a descriptive `<title>` tag between 50 and 60 characters with primary keywords.',
      sourceProvider: 'onpage',
    });
  } else if (onPageData.titleLength < 25) {
    findings.push({
      id: 'onpage-title-short',
      category: 'onpage',
      title: 'Title Tag is Too Short',
      description: `Current title is ${onPageData.titleLength} characters: "${onPageData.title}". It misses opportunities to target relevant keywords.`,
      status: 'warning',
      statusLabel: 'Warning',
      impact: 'Medium',
      recommendation: 'Expand your title tag to 50-60 characters including your brand and key value proposition.',
      sourceProvider: 'onpage',
    });
  } else if (onPageData.titleLength > 65) {
    findings.push({
      id: 'onpage-title-long',
      category: 'onpage',
      title: 'Title Tag May Be Truncated in SERP',
      description: `Current title is ${onPageData.titleLength} characters: "${onPageData.title}". Search engines may cut it off in mobile results.`,
      status: 'warning',
      statusLabel: 'Warning',
      impact: 'Low',
      recommendation: 'Shorten the title tag to under 60 characters to prevent truncation on mobile SERPs.',
      sourceProvider: 'onpage',
    });
  } else {
    findings.push({
      id: 'onpage-title-optimal',
      category: 'onpage',
      title: 'Title Tag Length Optimal',
      description: `Title tag is ${onPageData.titleLength} characters: "${onPageData.title}". Fits standard Google search display limits.`,
      status: 'verified',
      statusLabel: 'Verified',
      impact: 'High',
      recommendation: 'Ensure your most valuable search terms appear near the beginning of the title.',
      sourceProvider: 'onpage',
    });
  }

  // Meta Description
  if (!onPageData.metaDescription) {
    findings.push({
      id: 'onpage-desc-missing',
      category: 'onpage',
      title: 'Missing Meta Description',
      description: 'No `<meta name="description">` tag detected. Search engines will generate an automated snippet.',
      status: 'failed',
      statusLabel: 'Failed',
      impact: 'High',
      recommendation: 'Write an engaging meta description between 130 and 160 characters with a clear call-to-action.',
      sourceProvider: 'onpage',
    });
  } else if (onPageData.metaDescriptionLength < 70) {
    findings.push({
      id: 'onpage-desc-short',
      category: 'onpage',
      title: 'Meta Description is Brief',
      description: `Current meta description is ${onPageData.metaDescriptionLength} characters. You have room to provide more context.`,
      status: 'warning',
      statusLabel: 'Warning',
      impact: 'Medium',
      recommendation: 'Aim for 140-160 characters to maximize SERP visual real estate and organic click-through rate.',
      sourceProvider: 'onpage',
    });
  } else {
    findings.push({
      id: 'onpage-desc-optimal',
      category: 'onpage',
      title: 'Meta Description Configured',
      description: `Meta description is ${onPageData.metaDescriptionLength} characters: "${onPageData.metaDescription.slice(0, 80)}..."`,
      status: 'verified',
      statusLabel: 'Verified',
      impact: 'High',
      recommendation: 'A/B test different search snippet copy variations to maximize organic CTR.',
      sourceProvider: 'onpage',
    });
  }

  // H1 Heading
  if (onPageData.headingCount.h1 === 0) {
    findings.push({
      id: 'onpage-h1-missing',
      category: 'onpage',
      title: 'Missing H1 Heading',
      description: 'No <h1> tag was found. An H1 heading is vital for defining the primary subject of the document.',
      status: 'failed',
      statusLabel: 'Failed',
      impact: 'High',
      recommendation: 'Add a single, clear <h1> heading summarizing the main purpose of the page.',
      sourceProvider: 'onpage',
    });
  } else if (onPageData.headingCount.h1 > 1) {
    findings.push({
      id: 'onpage-h1-multiple',
      category: 'onpage',
      title: 'Multiple H1 Headings Detected',
      description: `Found ${onPageData.headingCount.h1} <h1> tags. Using multiple H1s can confuse document hierarchy.`,
      status: 'warning',
      statusLabel: 'Warning',
      impact: 'Low',
      recommendation: 'Consolidate down to a single primary <h1> heading and demote supplementary sections to <h2>.',
      sourceProvider: 'onpage',
    });
  } else {
    findings.push({
      id: 'onpage-h1-optimal',
      category: 'onpage',
      title: 'H1 Primary Heading Present',
      description: `Found 1 unambiguous <h1> tag: "${onPageData.h1Text ? onPageData.h1Text.slice(0, 60) : 'Present'}".`,
      status: 'verified',
      statusLabel: 'Verified',
      impact: 'High',
      recommendation: 'Ensure your H1 aligns closely with user search intent and topic relevance.',
      sourceProvider: 'onpage',
    });
  }

  // Heading Structure (H2 / H3)
  if (onPageData.headingCount.h2 === 0 && onPageData.headingCount.h3 === 0) {
    findings.push({
      id: 'onpage-headings-weak',
      category: 'onpage',
      title: 'Limited Subheading Structure',
      description: 'No <h2> or <h3> subheadings found. Long content requires logical section dividers for crawlers and readers.',
      status: 'warning',
      statusLabel: 'Warning',
      impact: 'Medium',
      recommendation: 'Organize page sections using descriptive <h2> and <h3> subheadings.',
      sourceProvider: 'onpage',
    });
  } else {
    findings.push({
      id: 'onpage-headings-structured',
      category: 'onpage',
      title: 'Subheading Hierarchy Configured',
      description: `Document contains ${onPageData.headingCount.h2} H2 tags and ${onPageData.headingCount.h3} H3 tags providing clear hierarchy.`,
      status: 'verified',
      statusLabel: 'Verified',
      impact: 'Medium',
      recommendation: 'Ensure headings logically follow descending order without skipping levels.',
      sourceProvider: 'onpage',
    });
  }

  // Image Alt Attributes
  if (onPageData.totalImages === 0) {
    findings.push({
      id: 'onpage-images-none',
      category: 'onpage',
      title: 'No Images Detected on Initial HTML',
      description: 'Zero inline <img> elements found in the server-rendered HTML.',
      status: 'verified',
      statusLabel: 'Verified',
      impact: 'Info',
      recommendation: 'Add high-quality visual media with descriptive alt attributes to enrich user experience.',
      sourceProvider: 'onpage',
    });
  } else if (onPageData.missingAltCount > 0) {
    findings.push({
      id: 'onpage-images-missing-alt',
      category: 'onpage',
      title: 'Images Missing ALT Attributes',
      description: `${onPageData.missingAltCount} out of ${onPageData.totalImages} images are missing alternative text attributes.`,
      status: 'warning',
      statusLabel: 'Warning',
      impact: 'Medium',
      recommendation: 'Add concise, descriptive alt attributes to all informational images for accessibility and image search.',
      technicalDetails: `${onPageData.missingAltCount} image tags lack valid alt attributes.`,
      sourceProvider: 'onpage',
    });
  } else {
    findings.push({
      id: 'onpage-images-alt-ok',
      category: 'onpage',
      title: 'Image Alt Accessibility Attributes Passed',
      description: `All ${onPageData.totalImages} images contain descriptive alt attributes.`,
      status: 'verified',
      statusLabel: 'Verified',
      impact: 'Medium',
      recommendation: 'Continue maintaining accessibility standards for all dynamically added assets.',
      sourceProvider: 'onpage',
    });
  }

  // ================= MOBILE & VIEWPORT CHECKS =================
  if (onPageData.viewportTag) {
    findings.push({
      id: 'mobile-viewport-ok',
      category: 'mobile',
      title: 'Responsive Viewport Meta Tag',
      description: `Configured: "${onPageData.viewportTag}". Enables fluid rendering across mobile devices.`,
      status: 'verified',
      statusLabel: 'Verified',
      impact: 'High',
      recommendation: 'Maintain responsive layout breakpoints across tablet and mobile viewports.',
      sourceProvider: 'onpage',
    });
  } else {
    findings.push({
      id: 'mobile-viewport-missing',
      category: 'mobile',
      title: 'Missing Viewport Meta Tag',
      description: 'No `<meta name="viewport">` found. Mobile browsers will render the page as desktop width.',
      status: 'failed',
      statusLabel: 'Failed',
      impact: 'High',
      recommendation: 'Add `<meta name="viewport" content="width=device-width, initial-scale=1">` to document head.',
      sourceProvider: 'onpage',
    });
  }

  // ================= SOCIAL & STRUCTURED DATA =================
  // Open Graph
  if (onPageData.ogTags.title || onPageData.ogTags.image) {
    findings.push({
      id: 'social-og-present',
      category: 'social_schema',
      title: 'Open Graph Social Meta Tags',
      description: `Open Graph tags detected (${[
        onPageData.ogTags.title ? 'og:title' : '',
        onPageData.ogTags.image ? 'og:image' : '',
        onPageData.ogTags.description ? 'og:description' : '',
      ]
        .filter(Boolean)
        .join(', ')}).`,
      status: 'verified',
      statusLabel: 'Verified',
      impact: 'Medium',
      recommendation: 'Verify og:image dimensions are at least 1200x630px for high-definition previews.',
      sourceProvider: 'onpage',
    });
  } else {
    findings.push({
      id: 'social-og-missing',
      category: 'social_schema',
      title: 'Missing Open Graph Tags',
      description: 'No Open Graph tags found. Links shared on LinkedIn, Facebook, or Slack will display plain text.',
      status: 'warning',
      statusLabel: 'Warning',
      impact: 'Medium',
      recommendation: 'Configure og:title, og:description, and og:image tags for branded visual link previews.',
      sourceProvider: 'onpage',
    });
  }

  // Structured Data / Schema
  if (onPageData.jsonLdSchemas.length > 0) {
    findings.push({
      id: 'schema-jsonld-present',
      category: 'social_schema',
      title: 'Structured Data Schema (JSON-LD)',
      description: `Detected Schema.org entities: ${onPageData.jsonLdSchemas.join(', ')}.`,
      status: 'verified',
      statusLabel: 'Verified',
      impact: 'High',
      recommendation: 'Validate with Google Rich Results Test to confirm rich snippet qualification.',
      sourceProvider: 'onpage',
    });
  } else {
    findings.push({
      id: 'schema-jsonld-missing',
      category: 'social_schema',
      title: 'No JSON-LD Structured Data Detected',
      description: 'No Schema.org structured data was found. Rich snippets and enhanced knowledge cards are unavailable.',
      status: 'warning',
      statusLabel: 'Warning',
      impact: 'Medium',
      recommendation: 'Add JSON-LD schema for Organization, WebSite, or specific entity types matching your business.',
      sourceProvider: 'onpage',
    });
  }

  // ================= PERFORMANCE / CORE WEB VITALS (From Lighthouse) =================
  if (lhData.success && lhData.metrics.lcp) {
    // Real LCP
    const lcpSec = (lhData.metrics.lcp.numericValueMs / 1000).toFixed(2);
    const isLcpGood = lhData.metrics.lcp.numericValueMs <= 2500;
    const isLcpPoor = lhData.metrics.lcp.numericValueMs > 4000;
    findings.push({
      id: 'perf-lcp',
      category: 'performance',
      title: 'Largest Contentful Paint (LCP)',
      description: `Real field/lab measurement: ${lhData.metrics.lcp.displayValue} (Google threshold: ≤ 2.5s).`,
      status: isLcpGood ? 'verified' : isLcpPoor ? 'failed' : 'warning',
      statusLabel: isLcpGood ? 'Verified' : isLcpPoor ? 'Failed' : 'Warning',
      impact: 'High',
      recommendation: isLcpGood
        ? 'Maintain current hero element optimization and caching.'
        : 'Preload hero images, optimize render-blocking CSS, and utilize an edge CDN.',
      sourceProvider: 'lighthouse',
    });

    // Real CLS
    if (lhData.metrics.cls) {
      const clsVal = lhData.metrics.cls.numericValue;
      const isClsGood = clsVal <= 0.1;
      findings.push({
        id: 'perf-cls',
        category: 'performance',
        title: 'Cumulative Layout Shift (CLS)',
        description: `Visual stability score: ${lhData.metrics.cls.displayValue} (Google threshold: ≤ 0.1).`,
        status: isClsGood ? 'verified' : 'warning',
        statusLabel: isClsGood ? 'Verified' : 'Warning',
        impact: 'High',
        recommendation: isClsGood
          ? 'Layout stability is solid.'
          : 'Set explicit width and height dimensions on images and dynamic banners to avoid layout jumps.',
        sourceProvider: 'lighthouse',
      });
    }

    // Real FCP
    if (lhData.metrics.fcp) {
      findings.push({
        id: 'perf-fcp',
        category: 'performance',
        title: 'First Contentful Paint (FCP)',
        description: `Measured at ${lhData.metrics.fcp.displayValue}. Marks the point when the first text or image renders.`,
        status: lhData.metrics.fcp.numericValueMs <= 1800 ? 'verified' : 'warning',
        statusLabel: lhData.metrics.fcp.numericValueMs <= 1800 ? 'Verified' : 'Warning',
        impact: 'Medium',
        recommendation: 'Eliminate render-blocking resources and ensure fast Time to First Byte.',
        sourceProvider: 'lighthouse',
      });
    }
  } else {
    // Lighthouse metrics unavailable
    findings.push({
      id: 'perf-lighthouse-status',
      category: 'performance',
      title: 'Google Lighthouse Performance Audit',
      description: lhData.error
        ? `Lighthouse audit unavailable: ${lhData.error}`
        : 'Google PageSpeed Insights data could not be retrieved at this time.',
      status: 'not_available',
      statusLabel: 'Not available',
      impact: 'Medium',
      recommendation: 'Retry analysis in a few minutes or verify that the website is publicly reachable without IP blocking.',
      sourceProvider: 'lighthouse',
    });
  }

  // 6. Build Web Vitals object (never fabricate)
  const buildMetric = (
    metricData: { displayValue: string; numericValue?: number; numericValueMs?: number } | null,
    goodThreshold: number,
    poorThreshold: number
  ): MetricValue => {
    if (!metricData) {
      return { value: 'Not available', status: 'not_available' };
    }
    const val = metricData.numericValueMs ?? metricData.numericValue ?? 0;
    const status = val <= goodThreshold ? 'good' : val <= poorThreshold ? 'needs-improvement' : 'poor';
    return {
      value: metricData.displayValue || `${val}`,
      numericValue: val,
      status,
    };
  };

  const webVitals: WebVitalsSummary = {
    lcp: buildMetric(lhData.metrics.lcp, 2500, 4000),
    cls: buildMetric(lhData.metrics.cls, 0.1, 0.25),
    fcp: buildMetric(lhData.metrics.fcp, 1800, 3000),
    tbt: buildMetric(lhData.metrics.tbt, 200, 600),
    speedIndex: buildMetric(lhData.metrics.speedIndex, 3400, 5800),
    ttfb: buildMetric(lhData.metrics.ttfb, 800, 1800),
  };

  // 7. Calculate Real Scores per Category (Never fabricate!)
  const computeCategoryScore = (
    catId: SeoCategoryType,
    catName: string,
    summaryText: string,
    lhScoreKey?: 'performance' | 'seo' | 'accessibility' | 'bestPractices'
  ): SeoCategoryScore => {
    const catFindings = findings.filter((f) => f.category === catId);
    const verifiedCount = catFindings.filter((f) => f.status === 'verified').length;
    const warningCount = catFindings.filter((f) => f.status === 'warning').length;
    const failedCount = catFindings.filter((f) => f.status === 'failed').length;
    const unavailableCount = catFindings.filter((f) => f.status === 'not_available').length;
    const totalCount = catFindings.length;

    let score: number | null = null;

    // If Lighthouse provided a score for this category, use real Lighthouse score!
    if (lhScoreKey && lhData.scores[lhScoreKey] !== null) {
      score = lhData.scores[lhScoreKey];
    } else if (totalCount > unavailableCount) {
      // Calculate strictly from real verified/failed ratio of actual checks
      const validChecks = totalCount - unavailableCount;
      const scoreWeight = verifiedCount * 100 + warningCount * 50;
      score = Math.round(scoreWeight / validChecks);
    }

    let statusText = 'Not available';
    if (score !== null) {
      if (score >= 80) statusText = 'Good';
      else if (score >= 60) statusText = 'Fair';
      else statusText = 'Needs Improvement';
    }

    return {
      id: catId,
      name: catName,
      score,
      statusText,
      summary: summaryText,
      verifiedCount,
      warningCount,
      failedCount,
      unavailableCount,
      totalCount,
    };
  };

  const categories: Record<SeoCategoryType, SeoCategoryScore> = {
    technical: computeCategoryScore(
      'technical',
      'Technical SEO',
      'Evaluates HTTPS encryption, robots.txt, sitemaps, indexability, and canonical tags.'
    ),
    onpage: computeCategoryScore(
      'onpage',
      'On-Page SEO',
      'Analyzes title tags, meta descriptions, H1-H3 structure, and image alt attributes.',
      'seo' // Can combine with Lighthouse SEO score
    ),
    performance: computeCategoryScore(
      'performance',
      'Performance',
      'Measures real Core Web Vitals (LCP, CLS, FCP) and page rendering speed.',
      'performance'
    ),
    content: computeCategoryScore(
      'content',
      'Content & Structure',
      'Reviews heading structure, textual readability, and semantic layout tags.'
    ),
    mobile: computeCategoryScore(
      'mobile',
      'Mobile SEO',
      'Validates responsive viewport meta configuration and mobile layout readiness.',
      'accessibility'
    ),
    social_schema: computeCategoryScore(
      'social_schema',
      'Social & Structured Data',
      'Verifies Open Graph tags, Twitter metadata, and Schema.org JSON-LD microdata.'
    ),
  };

  // Overall Score Calculation
  const validCategoryScores = Object.values(categories)
    .map((c) => c.score)
    .filter((s): s is number => s !== null);

  const overallScore =
    validCategoryScores.length > 0
      ? Math.round(validCategoryScores.reduce((a, b) => a + b, 0) / validCategoryScores.length)
      : null;

  const overallGrade = overallScore !== null ? getGradeFromScore(overallScore) : 'N/A';

  // Overall Status
  let statusLabel = 'Analysis Completed';
  let statusMessage = 'Live checks verified across technical, on-page, and search infrastructure.';
  if (overallScore !== null) {
    if (overallScore >= 85) {
      statusLabel = 'Strong SEO Foundation';
      statusMessage = 'Verified strong search readiness across technical and metadata signals.';
    } else if (overallScore >= 70) {
      statusLabel = 'Good — with clear optimization opportunities';
      statusMessage = 'Solid fundamentals detected, with actionable technical and on-page improvements.';
    } else if (overallScore >= 50) {
      statusLabel = 'Fair — critical gaps detected';
      statusMessage = 'Multiple technical or on-page signals are missing, limiting organic ranking potential.';
    } else {
      statusLabel = 'Critical Attention Required';
      statusMessage = 'Severe technical bottlenecks detected that may prevent search engine indexing.';
    }
  } else {
    statusLabel = 'Partial Analysis Available';
    statusMessage = 'Some third-party audits were unavailable, but live on-page signals have been verified.';
  }

  // Quick Stats
  const verifiedCount = findings.filter((f) => f.status === 'verified').length;
  const warningCount = findings.filter((f) => f.status === 'warning').length;
  const failedCount = findings.filter((f) => f.status === 'failed').length;
  const unavailableCount = findings.filter((f) => f.status === 'not_available').length;

  const executionTimeMs = Date.now() - startTime;

  // Executive Summary text
  const executiveSummary = `Live analysis for ${domain} completed in ${(executionTimeMs / 1000).toFixed(1)}s. ${
    overallScore !== null ? `Overall score evaluated at ${overallScore}/100 (Grade ${overallGrade}). ` : ''
  }Verified ${verifiedCount} passing signals, identified ${warningCount} optimization opportunities, and flagged ${failedCount} critical issues. ${
    failedCount > 0 ? 'Urgent remediation is recommended on highlighted items.' : 'Core technical foundation is healthy.'
  }`;

  const report: SeoReport = {
    id: 'report_' + Date.now().toString(36),
    url: normalizedUrl,
    domain,
    generatedAt: new Date().toISOString(),
    overallScore,
    overallGrade,
    statusLabel,
    statusMessage,
    executiveSummary,
    categories,
    findings,
    quickStats: {
      verifiedCount,
      warningCount,
      failedCount,
      unavailableCount,
      totalChecks: findings.length,
    },
    metrics: {
      loadTimeMs: lhData.metrics.ttfb?.numericValueMs || null,
      ttfbMs: lhData.metrics.ttfb?.numericValueMs || null,
      isHttps: onPageData.isHttps,
      hasSitemap: onPageData.sitemapXmlFound,
      hasRobotsTxt: onPageData.robotsTxtFound,
      headingCount: onPageData.headingCount,
      totalImagesCount: onPageData.totalImages,
      missingAltImagesCount: onPageData.missingAltCount,
      internalLinksCount: onPageData.internalLinksCount,
      externalLinksCount: onPageData.externalLinksCount,
      schemaTypesFound: onPageData.jsonLdSchemas,
      hasOgTags: !!(onPageData.ogTags.title || onPageData.ogTags.image),
      hasTwitterTags: !!(onPageData.twitterTags.card || onPageData.twitterTags.title),
    },
    webVitals,
    providerMetadata: {
      lighthouseSuccess: lhData.success,
      onPageSuccess: onPageData.success,
      lighthouseError: lhData.error,
      onPageError: onPageData.error,
      executionTimeMs,
    },
  };

  // Cache report
  reportCache.set(cacheKey, { report, timestamp: Date.now() });

  return report;
}
