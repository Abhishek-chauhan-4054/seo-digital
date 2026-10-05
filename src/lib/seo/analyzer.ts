import { SeoReport, AnalysisStage, StageStepInfo } from './types';
import { normalizeUrl } from '../utils';

export interface AnalyzerOptions {
  onProgress?: (stage: AnalysisStage, progress: number, stepInfo?: StageStepInfo) => void;
}

export const REAL_ANALYSIS_STAGES: StageStepInfo[] = [
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
 * Executes a REAL SEO analysis by calling the server-side /api/analyze endpoint.
 * Zero mock or fabricated results.
 */
export async function generateSeoReport(
  urlInput: string,
  options?: AnalyzerOptions
): Promise<SeoReport> {
  const { valid, normalized, error } = normalizeUrl(urlInput);

  if (!valid || !normalized) {
    throw new Error(error || 'Please enter a valid website URL.');
  }

  // Animate through real inspection stages while waiting for server response
  let stageIdx = 0;
  const progressTimer = setInterval(() => {
    if (stageIdx < REAL_ANALYSIS_STAGES.length) {
      const step = REAL_ANALYSIS_STAGES[stageIdx];
      if (options?.onProgress) {
        options.onProgress(step.stage, step.targetProgress, step);
      }
      stageIdx++;
    }
  }, 1200);

  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: normalized }),
    });

    clearInterval(progressTimer);

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Failed to analyze website. Please verify the URL and try again.');
    }

    if (options?.onProgress) {
      options.onProgress('completed', 100, {
        stage: 'completed',
        label: 'Analysis complete',
        description: 'Report ready.',
        targetProgress: 100,
      });
    }

    return result.report as SeoReport;
  } catch (err: any) {
    clearInterval(progressTimer);
    throw err;
  }
}
