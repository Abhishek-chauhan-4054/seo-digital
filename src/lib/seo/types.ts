export type SeoCategoryType = 
  | 'technical' 
  | 'onpage' 
  | 'performance' 
  | 'content' 
  | 'mobile' 
  | 'social_schema';

export type CheckStatus = 'verified' | 'warning' | 'failed' | 'not_available';

export type FindingImpact = 'High' | 'Medium' | 'Low' | 'Info';

export interface SeoFinding {
  id: string;
  category: SeoCategoryType;
  title: string;
  description: string;
  status: CheckStatus;
  statusLabel: string;
  impact: FindingImpact;
  recommendation: string;
  technicalDetails?: string;
  sourceProvider: 'lighthouse' | 'onpage' | 'server' | 'security';
  locked?: boolean;
  lockedDetails?: {
    previewSummary: string;
    actionableStep: string;
    impactExplanation: string;
  };
}

export interface SeoCategoryScore {
  id: SeoCategoryType;
  name: string;
  score: number | null; // null if not available
  statusText: string;
  summary: string;
  verifiedCount: number;
  warningCount: number;
  failedCount: number;
  unavailableCount: number;
  totalCount: number;
}

export interface MetricValue {
  value: string;
  numericValue?: number;
  status: 'good' | 'needs-improvement' | 'poor' | 'not_available';
  explanation?: string;
}

export interface WebVitalsSummary {
  lcp: MetricValue;
  cls: MetricValue;
  fcp: MetricValue;
  tbt: MetricValue;
  speedIndex: MetricValue;
  ttfb: MetricValue;
}

export interface SeoReport {
  id: string;
  url: string;
  domain: string;
  generatedAt: string;
  overallScore: number | null;
  overallGrade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'N/A';
  statusLabel: string;
  statusMessage: string;
  executiveSummary: string;
  categories: Record<SeoCategoryType, SeoCategoryScore>;
  findings: SeoFinding[];
  quickStats: {
    verifiedCount: number;
    warningCount: number;
    failedCount: number;
    unavailableCount: number;
    totalChecks: number;
  };
  metrics: {
    loadTimeMs: number | null;
    ttfbMs: number | null;
    isHttps: boolean | null;
    hasSitemap: boolean | null;
    hasRobotsTxt: boolean | null;
    headingCount: { h1: number; h2: number; h3: number } | null;
    totalImagesCount: number | null;
    missingAltImagesCount: number | null;
    internalLinksCount: number | null;
    externalLinksCount: number | null;
    schemaTypesFound: string[];
    hasOgTags: boolean;
    hasTwitterTags: boolean;
  };
  webVitals: WebVitalsSummary;
  providerMetadata: {
    lighthouseSuccess: boolean;
    onPageSuccess: boolean;
    lighthouseError?: string;
    onPageError?: string;
    executionTimeMs: number;
  };
}

export type AnalysisStage = 
  | 'idle'
  | 'validating_security'
  | 'fetching_html'
  | 'inspecting_onpage'
  | 'querying_lighthouse'
  | 'calculating_scores'
  | 'completed'
  | 'error';

export interface StageStepInfo {
  stage: AnalysisStage;
  label: string;
  description: string;
  targetProgress: number;
}

/**
 * Interface that all SEO data providers must implement
 */
export interface SeoAnalyzerProvider {
  name: string;
  analyze(url: string, domain: string): Promise<Partial<SeoReport>>;
}
