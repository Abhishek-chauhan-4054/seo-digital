import { URL } from 'url';

/**
 * Validates target URL and protects against SSRF (Server-Side Request Forgery).
 * Blocks private IP ranges, local loopbacks, non-HTTP protocols, and internal services.
 */
export function validateAndSanitizeUrl(input: string): {
  valid: boolean;
  normalizedUrl: string;
  domain: string;
  error?: string;
} {
  let trimmed = (input || '').trim().toLowerCase();
  if (!trimmed) {
    return { valid: false, normalizedUrl: '', domain: '', error: 'Please enter a website URL.' };
  }

  // Prepend https:// if protocol missing
  if (!/^https?:\/\//i.test(trimmed)) {
    trimmed = 'https://' + trimmed;
  }

  try {
    const parsed = new URL(trimmed);

    // Only allow HTTP and HTTPS
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return {
        valid: false,
        normalizedUrl: '',
        domain: '',
        error: 'Only HTTP and HTTPS URLs are supported.',
      };
    }

    const hostname = parsed.hostname.toLowerCase();

    // Reject localhost and loopback names
    if (
      hostname === 'localhost' ||
      hostname.endsWith('.localhost') ||
      hostname.endsWith('.local') ||
      hostname.endsWith('.internal') ||
      hostname === '0.0.0.0'
    ) {
      return {
        valid: false,
        normalizedUrl: '',
        domain: '',
        error: 'Local or internal network addresses are not permitted.',
      };
    }

    // Check for IP address literals
    // IPv4 check
    const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    const ipMatch = hostname.match(ipv4Regex);
    if (ipMatch) {
      const octet1 = parseInt(ipMatch[1], 10);
      const octet2 = parseInt(ipMatch[2], 10);

      // 127.0.0.0/8 (Loopback)
      if (octet1 === 127) {
        return { valid: false, normalizedUrl: '', domain: '', error: 'Loopback IP addresses are not permitted.' };
      }
      // 10.0.0.0/8 (Private)
      if (octet1 === 10) {
        return { valid: false, normalizedUrl: '', domain: '', error: 'Private IP addresses are not permitted.' };
      }
      // 172.16.0.0/12 (Private)
      if (octet1 === 172 && octet2 >= 16 && octet2 <= 31) {
        return { valid: false, normalizedUrl: '', domain: '', error: 'Private IP addresses are not permitted.' };
      }
      // 192.168.0.0/16 (Private)
      if (octet1 === 192 && octet2 === 168) {
        return { valid: false, normalizedUrl: '', domain: '', error: 'Private IP addresses are not permitted.' };
      }
      // 169.254.0.0/16 (Link-local)
      if (octet1 === 169 && octet2 === 254) {
        return { valid: false, normalizedUrl: '', domain: '', error: 'Link-local IP addresses are not permitted.' };
      }
      // 0.0.0.0/8 (Current network)
      if (octet1 === 0) {
        return { valid: false, normalizedUrl: '', domain: '', error: 'Invalid IP address.' };
      }
    }

    // Check for IPv6 literals
    if (hostname.startsWith('[') || hostname.includes(':')) {
      if (hostname === '[::1]' || hostname === '::1' || hostname.startsWith('fe80:') || hostname.startsWith('fc') || hostname.startsWith('fd')) {
        return { valid: false, normalizedUrl: '', domain: '', error: 'Private or loopback IPv6 addresses are not permitted.' };
      }
    }

    // Domain name syntax validation (must contain at least one dot and valid characters)
    const domainSyntaxRegex = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)+$/i;
    if (!domainSyntaxRegex.test(hostname)) {
      return {
        valid: false,
        normalizedUrl: '',
        domain: '',
        error: 'Please enter a valid domain name (e.g., example.com).',
      };
    }

    const cleanDomain = hostname.replace(/^www\./, '');

    return {
      valid: true,
      normalizedUrl: parsed.href,
      domain: cleanDomain,
    };
  } catch {
    return {
      valid: false,
      normalizedUrl: '',
      domain: '',
      error: 'Enter a valid website URL to continue.',
    };
  }
}
