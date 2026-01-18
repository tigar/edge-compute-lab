import { isBot, getBotType } from './utils/botDetection.js';
import { generateBotHTML, generateHumanHTML } from './templates/htmlTemplates.js';

/**
 * Main worker entry point for handling requests
 */
export default {
  /**
   * Fetch handler for incoming requests
   * @param {Request} request - The incoming request
   * @param {Object} env - Environment bindings
   * @param {Object} ctx - Execution context
   * @returns {Response} The response to send back
   */
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      const path = url.pathname;
      const viewAs = url.searchParams.get('view');

      // Detect if the request is from a bot
      const botDetected = isBot(request);
      const botType = getBotType(request);

      // Allow override via query parameter
      const showBotView = viewAs === 'bot' || (viewAs !== 'human' && botDetected);

      // Log for debugging
      console.log({
        path,
        botDetected,
        botType,
        viewAs,
        showBotView,
        userAgent: request.headers.get('user-agent'),
        timestamp: new Date().toISOString(),
      });

      // Generate appropriate HTML based on visitor type or query parameter
      const html = showBotView
        ? generateBotHTML(path, url)
        : generateHumanHTML(path, url);

      // Return response with appropriate headers
      return new Response(html, {
        headers: {
          'content-type': 'text/html;charset=UTF-8',
          'cache-control': 'public, max-age=300',
          'x-bot-detected': botDetected ? 'true' : 'false',
          'x-bot-type': botType || 'none',
          'x-view-as': showBotView ? 'bot' : 'human',
          'x-powered-by': 'Cloudflare Workers',
        },
      });
    } catch (error) {
      console.error('Error handling request:', error);

      return new Response('Internal Server Error', {
        status: 500,
        headers: {
          'content-type': 'text/plain',
        },
      });
    }
  },
};
