import { SeoFinding, SeoCategoryType, CheckStatus } from '../types';

export interface OnPageRawData {
  success: boolean;
  error?: string;
  statusCode?: number;
  isHttps: boolean;
  hasHsts: boolean;
  xRobotsTag: string | null;
  title: string | null;
  titleLength: number;
  metaDescription: string | null;
  metaDescriptionLength: number;
  canonicalUrl: string | null;
  metaRobots: string | null;
  isNoindex: boolean;
  isNofollow: boolean;
  viewportTag: string | null;
  headingCount: { h1: number; h2: number; h3: number };
  h1Text: string | null;
  totalImages: number;
  missingAltCount: number;
  internalLinksCount: number;
  externalLinksCount: number;
  ogTags: {
    title: string | null;
    description: string | null;
    image: string | null;
    url: string | null;
    type: string | null;
  };
  twitterTags: {
    card: string | null;
    title: string | null;
    description: string | null;
    image: string | null;
  };
  jsonLdSchemas: string[];
  robotsTxtFound: boolean | null;
  sitemapXmlFound: boolean | null;
}

export class OnPageProvider {
  name = 'OnPageProvider';

  /**
   * Fetches the live HTML of target URL and runs thorough on-page checks
   */
  async analyze(url: string, domain: string): Promise<OnPageRawData> {
    const isHttps = url.startsWith('https://');

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 9000);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; PytronBot/1.0; +https://digital.pytron.io)',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
        },
        signal: controller.signal,
        redirect: 'follow',
      });

      clearTimeout(timeoutId);

      const statusCode = response.status;
      const headers = response.headers;
      const hstsHeader = headers.get('strict-transport-security');
      const xRobots = headers.get('x-robots-tag');

      const html = await response.text();

      // Parallel lightweight checks for robots.txt and sitemap.xml
      const origin = new URL(url).origin;
      const [robotsResult, sitemapResult] = await Promise.allSettled([
        this.checkRobotsTxt(origin),
        this.checkSitemapXml(origin),
      ]);

      const robotsTxtFound = robotsResult.status === 'fulfilled' ? robotsResult.value : null;
      const sitemapXmlFound = sitemapResult.status === 'fulfilled' ? sitemapResult.value : null;

      // Parse HTML
      return this.parseHtml(html, {
        statusCode,
        isHttps,
        hasHsts: !!hstsHeader,
        xRobotsTag: xRobots,
        domain,
        url,
        robotsTxtFound,
        sitemapXmlFound,
      });
    } catch (err: any) {
      const errorMsg = err.name === 'AbortError' ? 'Connection timed out while fetching website' : err.message;
      return {
        success: false,
        error: errorMsg,
        isHttps,
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
    }
  }

  private async checkRobotsTxt(origin: string): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4000);
      const res = await fetch(`${origin}/robots.txt`, {
        method: 'GET',
        headers: { 'User-Agent': 'PytronBot/1.0 (+https://digital.pytron.io)' },
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (!res.ok) return false;
      const text = await res.text();
      return /user-agent:/i.test(text);
    } catch {
      return false;
    }
  }

  private async checkSitemapXml(origin: string): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4000);
      const res = await fetch(`${origin}/sitemap.xml`, {
        method: 'GET',
        headers: { 'User-Agent': 'PytronBot/1.0 (+https://digital.pytron.io)' },
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (!res.ok) return false;
      const text = await res.text();
      return /<urlset|<sitemapindex/i.test(text);
    } catch {
      return false;
    }
  }

  private parseHtml(
    html: string,
    meta: {
      statusCode: number;
      isHttps: boolean;
      hasHsts: boolean;
      xRobotsTag: string | null;
      domain: string;
      url: string;
      robotsTxtFound: boolean | null;
      sitemapXmlFound: boolean | null;
    }
  ): OnPageRawData {
    // 1. Title tag
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : null;
    const titleLength = title ? title.length : 0;

    // 2. Meta description
    const descMatch =
      html.match(/<meta\s+[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
      html.match(/<meta\s+[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
    const metaDescription = descMatch ? descMatch[1].trim() : null;
    const metaDescriptionLength = metaDescription ? metaDescription.length : 0;

    // 3. Canonical link
    const canonicalMatch =
      html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i) ||
      html.match(/<link\s+[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["']/i);
    const canonicalUrl = canonicalMatch ? canonicalMatch[1].trim() : null;

    // 4. Meta robots
    const robotsMatch =
      html.match(/<meta\s+[^>]*name=["']robots["'][^>]*content=["']([^"']*)["']/i) ||
      html.match(/<meta\s+[^>]*content=["']([^"']*)["'][^>]*name=["']robots["']/i);
    const metaRobots = robotsMatch ? robotsMatch[1].trim().toLowerCase() : null;
    const combinedRobots = `${metaRobots || ''} ${meta.xRobotsTag || ''}`.toLowerCase();
    const isNoindex = combinedRobots.includes('noindex');
    const isNofollow = combinedRobots.includes('nofollow');

    // 5. Viewport
    const viewportMatch =
      html.match(/<meta\s+[^>]*name=["']viewport["'][^>]*content=["']([^"']*)["']/i) ||
      html.match(/<meta\s+[^>]*content=["']([^"']*)["'][^>]*name=["']viewport["']/i);
    const viewportTag = viewportMatch ? viewportMatch[1].trim() : null;

    // 6. Headings
    const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
    const h2Matches = html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi) || [];
    const h3Matches = html.match(/<h3[^>]*>([\s\S]*?)<\/h3>/gi) || [];

    let h1Text: string | null = null;
    if (h1Matches && h1Matches.length > 0 && h1Matches[0]) {
      h1Text = h1Matches[0].replace(/<[^>]+>/g, '').trim();
    }

    // 7. Images and Alt text
    const imgRegex = /<img\s+[^>]*>/gi;
    let imgMatch: RegExpExecArray | null;
    let totalImages = 0;
    let missingAltCount = 0;

    while ((imgMatch = imgRegex.exec(html)) !== null) {
      totalImages++;
      const tag = imgMatch[0];
      const hasAlt = /alt=["']([^"']*)["']/i.test(tag);
      if (!hasAlt) {
        missingAltCount++;
      } else {
        const altContent = tag.match(/alt=["']([^"']*)["']/i)?.[1]?.trim();
        if (!altContent) {
          missingAltCount++;
        }
      }
    }

    // 8. Internal and External Links
    const linkRegex = /<a\s+[^>]*href=["']([^"']*)["'][^>]*>/gi;
    let linkMatch: RegExpExecArray | null;
    let internalLinksCount = 0;
    let externalLinksCount = 0;

    while ((linkMatch = linkRegex.exec(html)) !== null) {
      const href = linkMatch[1].trim();
      if (!href || href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        continue;
      }
      if (href.startsWith('/') || href.startsWith('./') || href.startsWith('../') || href.includes(meta.domain)) {
        internalLinksCount++;
      } else if (href.startsWith('http://') || href.startsWith('https://')) {
        externalLinksCount++;
      }
    }

    // 9. Open Graph Tags
    const getOg = (property: string) => {
      const m =
        html.match(new RegExp(`<meta\\s+[^>]*property=["']og:${property}["'][^>]*content=["']([^"']*)["']`, 'i')) ||
        html.match(new RegExp(`<meta\\s+[^>]*content=["']([^"']*)["'][^>]*property=["']og:${property}["']`, 'i'));
      return m ? m[1].trim() : null;
    };

    const ogTags = {
      title: getOg('title'),
      description: getOg('description'),
      image: getOg('image'),
      url: getOg('url'),
      type: getOg('type'),
    };

    // 10. Twitter Tags
    const getTwitter = (name: string) => {
      const m =
        html.match(new RegExp(`<meta\\s+[^>]*name=["']twitter:${name}["'][^>]*content=["']([^"']*)["']`, 'i')) ||
        html.match(new RegExp(`<meta\\s+[^>]*content=["']([^"']*)["'][^>]*name=["']twitter:${name}["']`, 'i'));
      return m ? m[1].trim() : null;
    };

    const twitterTags = {
      card: getTwitter('card'),
      title: getTwitter('title'),
      description: getTwitter('description'),
      image: getTwitter('image'),
    };

    // 11. JSON-LD Structured Data
    const jsonLdSchemas: string[] = [];
    const jsonLdRegex = /<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
    let jsonMatch: RegExpExecArray | null;

    while ((jsonMatch = jsonLdRegex.exec(html)) !== null) {
      try {
        const rawJson = jsonMatch[1].trim();
        const parsed = JSON.parse(rawJson);
        const extractTypes = (obj: any) => {
          if (!obj) return;
          if (Array.isArray(obj)) {
            obj.forEach(extractTypes);
          } else if (typeof obj === 'object') {
            if (obj['@type']) {
              if (Array.isArray(obj['@type'])) {
                obj['@type'].forEach((t: string) => jsonLdSchemas.push(String(t)));
              } else {
                jsonLdSchemas.push(String(obj['@type']));
              }
            }
            if (obj['@graph'] && Array.isArray(obj['@graph'])) {
              obj['@graph'].forEach(extractTypes);
            }
          }
        };
        extractTypes(parsed);
      } catch {
        // invalid JSON in script tag
      }
    }

    return {
      success: true,
      statusCode: meta.statusCode,
      isHttps: meta.isHttps,
      hasHsts: meta.hasHsts,
      xRobotsTag: meta.xRobotsTag,
      title,
      titleLength,
      metaDescription,
      metaDescriptionLength,
      canonicalUrl,
      metaRobots,
      isNoindex,
      isNofollow,
      viewportTag,
      headingCount: {
        h1: h1Matches.length,
        h2: h2Matches.length,
        h3: h3Matches.length,
      },
      h1Text,
      totalImages,
      missingAltCount,
      internalLinksCount,
      externalLinksCount,
      ogTags,
      twitterTags,
      jsonLdSchemas: Array.from(new Set(jsonLdSchemas)),
      robotsTxtFound: meta.robotsTxtFound,
      sitemapXmlFound: meta.sitemapXmlFound,
    };
  }
}
