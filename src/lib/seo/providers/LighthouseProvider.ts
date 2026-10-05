export interface LighthouseRawData {
  success: boolean;
  error?: string;
  scores: {
    performance: number | null;
    seo: number | null;
    accessibility: number | null;
    bestPractices: number | null;
  };
  metrics: {
    lcp: { displayValue: string; numericValueMs: number; score: number | null } | null;
    cls: { displayValue: string; numericValue: number; score: number | null } | null;
    fcp: { displayValue: string; numericValueMs: number; score: number | null } | null;
    tbt: { displayValue: string; numericValueMs: number; score: number | null } | null;
    speedIndex: { displayValue: string; numericValueMs: number; score: number | null } | null;
    ttfb: { displayValue: string; numericValueMs: number; score: number | null } | null;
  };
  audits: Record<string, { id: string; title: string; score: number | null; displayValue?: string; explanation?: string }>;
}

export class LighthouseProvider {
  name = 'LighthouseProvider';

  /**
   * Queries Google PageSpeed Insights API for real Lighthouse audits
   */
  async analyze(url: string): Promise<LighthouseRawData> {
    const apiKey = process.env.PAGESPEED_API_KEY || process.env.GOOGLE_API_KEY || '';
    const keyParam = apiKey ? `&key=${encodeURIComponent(apiKey)}` : '';

    const apiUrl = `https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
      url
    )}&category=PERFORMANCE&category=SEO&category=ACCESSIBILITY&category=BEST_PRACTICES&strategy=mobile${keyParam}`;

    try {
      const controller = new AbortController();
      // Google PageSpeed can take up to 20 seconds for cold runs
      const timeoutId = setTimeout(() => controller.abort(), 22000);

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorBody = await response.text().catch(() => '');
        let detailedMsg = `PageSpeed API returned status ${response.status}`;
        if (response.status === 429) {
          detailedMsg = 'Google PageSpeed Insights rate limit reached. Please wait a moment and retry.';
        } else if (response.status === 400) {
          detailedMsg = 'Target URL could not be crawled by Google PageSpeed Insights.';
        } else if (response.status === 500) {
          detailedMsg = 'Google PageSpeed service encountered a temporary error.';
        }
        return {
          success: false,
          error: detailedMsg,
          scores: { performance: null, seo: null, accessibility: null, bestPractices: null },
          metrics: { lcp: null, cls: null, fcp: null, tbt: null, speedIndex: null, ttfb: null },
          audits: {},
        };
      }

      const data = await response.json();
      const lh = data?.lighthouseResult;

      if (!lh) {
        return {
          success: false,
          error: 'No Lighthouse result found in API response',
          scores: { performance: null, seo: null, accessibility: null, bestPractices: null },
          metrics: { lcp: null, cls: null, fcp: null, tbt: null, speedIndex: null, ttfb: null },
          audits: {},
        };
      }

      // 1. Extract Scores
      const parseScore = (val: any) => (typeof val === 'number' ? Math.round(val * 100) : null);
      const scores = {
        performance: parseScore(lh.categories?.performance?.score),
        seo: parseScore(lh.categories?.seo?.score),
        accessibility: parseScore(lh.categories?.accessibility?.score),
        bestPractices: parseScore(lh.categories?.['best-practices']?.score),
      };

      // 2. Extract Core Web Vitals
      const auditMap = lh.audits || {};

      const getMetric = (key: string, isMs = true) => {
        const a = auditMap[key];
        if (!a) return null;
        return {
          displayValue: a.displayValue || (isMs && a.numericValue ? `${Math.round(a.numericValue)} ms` : String(a.numericValue || 'N/A')),
          numericValueMs: isMs ? a.numericValue || 0 : 0,
          numericValue: a.numericValue || 0,
          score: typeof a.score === 'number' ? a.score : null,
        };
      };

      const metrics = {
        lcp: getMetric('largest-contentful-paint', true),
        cls: getMetric('cumulative-layout-shift', false),
        fcp: getMetric('first-contentful-paint', true),
        tbt: getMetric('total-blocking-time', true),
        speedIndex: getMetric('speed-index', true),
        ttfb: getMetric('server-response-time', true),
      };

      // 3. Extract relevant audits
      const relevantAuditKeys = [
        'is-crawlable',
        'document-title',
        'meta-description',
        'canonical',
        'viewport',
        'image-alt',
        'structured-data',
        'font-size',
        'tap-targets',
        'is-on-https',
        'robots-txt',
        'redirects',
        'uses-optimized-images',
        'uses-responsive-images',
        'uses-text-compression',
        'render-blocking-resources',
      ];

      const extractedAudits: Record<string, any> = {};
      for (const k of relevantAuditKeys) {
        if (auditMap[k]) {
          extractedAudits[k] = {
            id: auditMap[k].id,
            title: auditMap[k].title,
            score: typeof auditMap[k].score === 'number' ? auditMap[k].score : null,
            displayValue: auditMap[k].displayValue,
            explanation: auditMap[k].explanation || auditMap[k].description,
          };
        }
      }

      return {
        success: true,
        scores,
        metrics,
        audits: extractedAudits,
      };
    } catch (err: any) {
      const errorMsg =
        err.name === 'AbortError'
          ? 'PageSpeed audit timed out (Google servers busy)'
          : err.message || 'Failed to query PageSpeed API';
      return {
        success: false,
        error: errorMsg,
        scores: { performance: null, seo: null, accessibility: null, bestPractices: null },
        metrics: { lcp: null, cls: null, fcp: null, tbt: null, speedIndex: null, ttfb: null },
        audits: {},
      };
    }
  }
}
