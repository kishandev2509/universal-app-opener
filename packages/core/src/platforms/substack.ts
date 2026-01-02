import { DeepLinkHandler } from '../types';

/**
 * Substack Deep Link Handler
 *
 * Supports:
 * - Publication home: https://example.substack.com
 * - Post pages: https://example.substack.com/p/post-slug
 * - About pages: https://example.substack.com/about
 * - Archive pages: https://example.substack.com/archive
 *
 * Note: Substack uses Universal Links (iOS) and App Links (Android) rather than
 * custom URL schemes. The app will intercept HTTPS URLs if installed.
 * We provide the HTTPS URL as fallback since the native app handles these directly.
 *
 * Deep link approach:
 * - iOS: Uses substack:// scheme with path
 * - Android: Uses intent with substack scheme
 */
export const substackHandler: DeepLinkHandler = {
  match: (url) => {
    // Match *.substack.com URLs and capture the subdomain and optional path
    return url.match(/^https?:\/\/([a-z0-9-]+)\.substack\.com(\/(?:p\/[^/?#]+|about|archive)?)?/i);
  },

  build: (webUrl, match) => {
    const publication = match[1];
    const path = match[2] || '';

    // Construct the deep link path
    const deepLinkPath = `${publication}${path}`;

    return {
      webUrl,
      // Substack app uses substack:// scheme
      ios: `substack://${deepLinkPath}`,
      android: `intent://${deepLinkPath}#Intent;scheme=substack;package=com.substack.app;end`,
      platform: 'substack',
    };
  },
};
