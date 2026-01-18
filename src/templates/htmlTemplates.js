import {
  generateMetaTags,
  generateOpenGraphTags,
  generateTwitterCardTags,
} from '../utils/metaTags.js';

/**
 * Generates full HTML for bot crawlers with complete meta tags
 * @param {string} path - The URL path
 * @param {Object} customMeta - Optional custom meta tag data
 * @returns {string} Complete HTML document for bots
 */
export function generateBotHTML(path, customMeta = {}) {
  const meta = generateMetaTags(path, customMeta);
  const ogTags = generateOpenGraphTags(meta);
  const twitterTags = generateTwitterCardTags(meta);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${meta.title}</title>
  <meta name="description" content="${meta.description}" />

  ${ogTags}

  ${twitterTags}

  <link rel="canonical" href="${meta.url}" />
</head>
<body>
  <main>
    <h1>${meta.title}</h1>
    <p>${meta.description}</p>

    <section>
      <h2>Content optimized for crawlers</h2>
      <p>This page has been server-side rendered with complete meta tags for optimal SEO and social media sharing.</p>

      <article>
        <h3>Path: ${path}</h3>
        <p>This content is dynamically generated based on the URL path and optimized for bot indexing.</p>
      </article>
    </section>
  </main>

  <footer>
    <p>&copy; 2024 Edge Compute Lab. Rendered for bots at the edge.</p>
  </footer>
</body>
</html>`;
}

/**
 * Generates minimal HTML shell for human visitors with client-side app
 * @param {string} path - The URL path
 * @param {Object} customMeta - Optional custom meta tag data
 * @returns {string} Minimal HTML shell for humans
 */
export function generateHumanHTML(path, customMeta = {}) {
  const meta = generateMetaTags(path, customMeta);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${meta.title}</title>
  <meta name="description" content="${meta.description}" />

  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      line-height: 1.6;
      color: #333;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .container {
      background: white;
      border-radius: 12px;
      padding: 40px;
      max-width: 800px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    h1 {
      color: #667eea;
      margin-bottom: 20px;
      font-size: 2.5em;
    }
    .badge {
      display: inline-block;
      background: #48bb78;
      color: white;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 0.85em;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .info {
      background: #f7fafc;
      border-left: 4px solid #667eea;
      padding: 20px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .info h3 {
      color: #667eea;
      margin-bottom: 10px;
    }
    code {
      background: #2d3748;
      color: #68d391;
      padding: 2px 8px;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
    }
    .meta-info {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid #e2e8f0;
    }
    .meta-info dt {
      font-weight: 600;
      color: #667eea;
      margin-top: 10px;
    }
    .meta-info dd {
      margin-left: 20px;
      color: #4a5568;
    }
    footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid #e2e8f0;
      text-align: center;
      color: #718096;
      font-size: 0.9em;
    }
  </style>
</head>
<body>
  <div class="container">
    <main>
      <span class="badge">Human Visitor Detected</span>
      <h1>${meta.title}</h1>
      <p>${meta.description}</p>

      <div class="info">
        <h3>Edge Computing in Action</h3>
        <p>This page is being served from Cloudflare's edge network, with content optimized specifically for human visitors. The response is fast, lightweight, and delivered from a location near you.</p>
      </div>

      <div class="info">
        <h3>Bot Detection</h3>
        <p>When bots (like Googlebot or social media crawlers) visit this same URL, they receive a different response with fully-rendered HTML and complete meta tags for optimal SEO and social sharing.</p>
      </div>

      <div class="meta-info">
        <h3>Page Metadata</h3>
        <dl>
          <dt>Current Path:</dt>
          <dd><code>${path}</code></dd>

          <dt>Page Type:</dt>
          <dd><code>${meta.type}</code></dd>

          <dt>Rendered At:</dt>
          <dd><code>Cloudflare Edge (${new Date().toISOString()})</code></dd>
        </dl>
      </div>

      <div class="info">
        <h3>Try It Out</h3>
        <p>Visit different paths to see dynamic meta tag generation:</p>
        <ul style="margin-left: 20px; margin-top: 10px;">
          <li><code>/blog/my-article</code></li>
          <li><code>/product/awesome-widget</code></li>
          <li><code>/about</code></li>
        </ul>
      </div>
    </main>

    <footer>
      <p>Powered by Cloudflare Workers</p>
    </footer>
  </div>

  <script>
    // Client-side app would initialize here
    console.log('Human-optimized content loaded!');
    console.log('Path:', '${path}');
    console.log('Meta:', ${JSON.stringify(meta)});
  </script>
</body>
</html>`;
}
