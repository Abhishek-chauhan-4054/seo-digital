import {
  SeoReport,
  StageStepInfo,
  AnalysisStage,
} from './types';
import { analyzeWebsite } from './analyzerService';

export const ANALYSIS_STAGES: StageStepInfo[] = [
  {
    stage: 'validating_security',
    label: 'Validating security & SSL',
    description: 'Verifying protocol, domain safety, and checking for SSRF protection...',
    targetProgress: 20,
  },
  {
    stage: 'fetching_html',
    label: 'Fetching live HTML & headers',
    description: 'Retrieving server response, checking status codes, HSTS, and robots directives...',
    targetProgress: 40,
  },
  {
    stage: 'inspecting_onpage',
    label: 'Inspecting on-page architecture',
    description: 'Analyzing real title tags, meta descriptions, headings, images, and JSON-LD...',
    targetProgress: 65,
  },
  {
    stage: 'querying_lighthouse',
    label: 'Querying Google PageSpeed & Core Web Vitals',
    description: 'Benchmarking LCP, CLS, FCP, and Lighthouse performance metrics...',
    targetProgress: 88,
  },
  {
    stage: 'calculating_scores',
    label: 'Verifying signals & compiling report',
    description: 'Validating real audit pass rates and compiling executive summary...',
    targetProgress: 98,
  },
];

/**
 * Executes analysis using the real analyzer service
 */
export async function generateMockReport(url: string, domain: string): Promise<SeoReport> {
  return await analyzeWebsite(url);
}
