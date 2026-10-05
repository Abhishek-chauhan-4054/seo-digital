import { SeoCategoryScore, SeoCategoryType, SeoReport } from './types';

/**
 * Deterministic string hash algorithm (djb2)
 */
export function hashString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
  }
  return Math.abs(hash);
}

/**
 * Returns a deterministic number within [min, max] based on a seed string and salt
 */
export function pseudoRandom(seed: string, salt: string, min: number, max: number): number {
  const combined = seed + ':' + salt;
  const hash = hashString(combined);
  const range = max - min + 1;
  return min + (hash % range);
}

/**
 * Calculate grade based on 0-100 score
 */
export function getGradeFromScore(score: number): 'A+' | 'A' | 'B' | 'C' | 'D' {
  if (score >= 90) return 'A+';
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 55) return 'C';
  return 'D';
}

/**
 * Calculate score status label and message
 */
export function getScoreStatus(score: number): { label: string; message: string; colorClass: string; badgeClass: string } {
  if (score >= 85) {
    return {
      label: 'Strong SEO Foundation',
      message: 'Great search engine foundation with minor technical opportunities.',
      colorClass: 'text-emerald-600',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    };
  }
  if (score >= 70) {
    return {
      label: 'Good — but there is room to improve',
      message: 'Your website has solid fundamentals, but key technical and metadata issues are limiting organic potential.',
      colorClass: 'text-amber-600',
      badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
    };
  }
  if (score >= 50) {
    return {
      label: 'Fair — significant gaps detected',
      message: 'Multiple critical SEO signals are missing or misconfigured, impacting indexability and rankings.',
      colorClass: 'text-orange-600',
      badgeClass: 'bg-orange-50 text-orange-700 border-orange-200',
    };
  }
  return {
    label: 'Critical Attention Required',
    message: 'Severe technical bottlenecks and missing crawl signals are blocking search engine performance.',
    colorClass: 'text-rose-600',
    badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
  };
}

/**
 * Category weightings for overall score computation
 */
export const CATEGORY_WEIGHTS: Record<SeoCategoryType, number> = {
  technical: 0.25,
  onpage: 0.25,
  performance: 0.20,
  content: 0.15,
  mobile: 0.10,
  social_schema: 0.05,
};

/**
 * Compute overall score from individual category scores
 */
export function computeOverallScore(categories: Record<SeoCategoryType, SeoCategoryScore>): number {
  let weightedSum = 0;
  let totalWeight = 0;

  for (const [key, category] of Object.entries(categories) as [SeoCategoryType, SeoCategoryScore][]) {
    if (category.score !== null) {
      const weight = CATEGORY_WEIGHTS[key] || 0.1;
      weightedSum += category.score * weight;
      totalWeight += weight;
    }
  }

  return totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 75;
}
