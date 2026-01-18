import { isBot, getBotType } from '../botDetection.js';

/**
 * Creates a mock request with the given user agent
 */
function createMockRequest(userAgent) {
  return {
    headers: {
      get: (name) => {
        if (name.toLowerCase() === 'user-agent') {
          return userAgent;
        }
        return null;
      },
    },
  };
}

describe('botDetection', () => {
  describe('isBot', () => {
    test('should detect Googlebot', () => {
      const request = createMockRequest('Mozilla/5.0 (compatible; Googlebot/2.1)');
      expect(isBot(request)).toBe(true);
    });

    test('should detect Bingbot', () => {
      const request = createMockRequest('Mozilla/5.0 (compatible; bingbot/2.0)');
      expect(isBot(request)).toBe(true);
    });

    test('should detect Facebook crawler', () => {
      const request = createMockRequest('facebookexternalhit/1.1');
      expect(isBot(request)).toBe(true);
    });

    test('should detect Twitterbot', () => {
      const request = createMockRequest('Twitterbot/1.0');
      expect(isBot(request)).toBe(true);
    });

    test('should detect LinkedInBot', () => {
      const request = createMockRequest('LinkedInBot/1.0 (compatible; Mozilla/5.0)');
      expect(isBot(request)).toBe(true);
    });

    test('should not detect Chrome as a bot', () => {
      const request = createMockRequest(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      );
      expect(isBot(request)).toBe(false);
    });

    test('should not detect Firefox as a bot', () => {
      const request = createMockRequest(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0'
      );
      expect(isBot(request)).toBe(false);
    });

    test('should not detect Safari as a bot', () => {
      const request = createMockRequest(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15'
      );
      expect(isBot(request)).toBe(false);
    });

    test('should handle missing user agent', () => {
      const request = createMockRequest(null);
      expect(isBot(request)).toBe(false);
    });

    test('should handle empty user agent', () => {
      const request = createMockRequest('');
      expect(isBot(request)).toBe(false);
    });

    test('should be case insensitive', () => {
      const request = createMockRequest('GOOGLEBOT/2.1');
      expect(isBot(request)).toBe(true);
    });
  });

  describe('getBotType', () => {
    test('should return bot type for Googlebot', () => {
      const request = createMockRequest('Mozilla/5.0 (compatible; Googlebot/2.1)');
      expect(getBotType(request)).toBe('googlebot');
    });

    test('should return bot type for Facebook crawler', () => {
      const request = createMockRequest('facebookexternalhit/1.1');
      expect(getBotType(request)).toBe('facebookexternalhit');
    });

    test('should return null for human browsers', () => {
      const request = createMockRequest(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      );
      expect(getBotType(request)).toBe(null);
    });

    test('should return null for missing user agent', () => {
      const request = createMockRequest(null);
      expect(getBotType(request)).toBe(null);
    });

    test('should return first matching pattern', () => {
      const request = createMockRequest('Mozilla/5.0 (compatible; Googlebot/2.1; +bot +crawler)');
      expect(getBotType(request)).toBe('googlebot');
    });
  });
});
