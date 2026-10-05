import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number to 1 decimal place or integer
 */
export function formatScore(num: number): number {
  return Math.round(num);
}

/**
 * Clean and normalize a website URL
 */
export function normalizeUrl(input: string): { valid: boolean; normalized: string; domain: string; error?: string } {
  let trimmed = input.trim().toLowerCase();
  if (!trimmed) {
    return { valid: false, normalized: '', domain: '', error: 'Enter a valid website URL to continue.' };
  }

  // Prepend https:// if no protocol provided
  if (!/^https?:\/\//i.test(trimmed)) {
    trimmed = 'https://' + trimmed;
  }

  try {
    const urlObj = new URL(trimmed);
    const hostname = urlObj.hostname;

    // Validate hostname contains at least one dot and valid chars
    const domainRegex = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)+$/i;
    if (!domainRegex.test(hostname)) {
      return { valid: false, normalized: '', domain: '', error: 'Please enter a valid domain name (e.g., example.com).' };
    }

    return {
      valid: true,
      normalized: urlObj.href,
      domain: hostname.replace(/^www\./, ''),
    };
  } catch {
    return { valid: false, normalized: '', domain: '', error: 'Enter a valid website URL to continue.' };
  }
}
