/**
 * List of common bot user agent patterns for detection
 */
const BOT_PATTERNS = [
  // Search engine bots
  'googlebot',
  'bingbot',
  'slurp', // Yahoo
  'duckduckbot',
  'baiduspider',
  'yandexbot',
  'sogou',
  'exabot',

  // Social media crawlers
  'facebookexternalhit',
  'facebookcatalog',
  'twitterbot',
  'linkedinbot',
  'slackbot',
  'telegrambot',
  'whatsapp',
  'discordbot',
  'redditbot',
  'pinterestbot',

  // Other common bots
  'crawler',
  'spider',
  'bot',
  'crawling',
  'headless',
  'phantom',
  'puppeteer',
  'selenium',
];

/**
 * Detects if the request is from a bot based on the User-Agent header
 * @param {Request} request - The incoming request object
 * @returns {boolean} True if the request is from a bot, false otherwise
 */
export function isBot(request: Request): boolean {
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';

  // Check if any bot pattern matches
  return BOT_PATTERNS.some((pattern) => userAgent.includes(pattern));
}

/**
 * Gets the bot type from the User-Agent header
 * @param {Request} request - The incoming request object
 * @returns {string|null} The bot type or null if not a bot
 */
export function getBotType(request: Request): string | null {
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';

  for (const pattern of BOT_PATTERNS) {
    if (userAgent.includes(pattern)) {
      return pattern;
    }
  }

  return null;
}
