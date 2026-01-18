# Edge Compute Lab

Dynamic meta tag generation based on bot vs human traffic using Cloudflare Workers.

## Overview

This project demonstrates how to use edge computing to serve different content to bots and humans. When search engine crawlers or social media bots visit your site, they receive fully server-side rendered HTML with complete meta tags for optimal SEO and social sharing. Human visitors receive an optimized, interactive experience.

## Features

- **Bot Detection**: Automatically identifies crawlers from Google, Bing, Facebook, Twitter, LinkedIn, and more
- **Dynamic Meta Tags**: Generates Open Graph and Twitter Card meta tags based on URL paths
- **SSR for Bots**: Full HTML rendering for crawlers to ensure proper indexing
- **Optimized for Humans**: Lightweight, fast-loading pages for real users
- **Edge Computing**: Powered by Cloudflare Workers for global low-latency responses
- **Path-Based Content**: Automatically generates metadata based on URL structure

## Project Structure

```
edge-compute-lab/
├── src/
│   ├── index.js                    # Main worker entry point
│   ├── utils/
│   │   ├── botDetection.js         # Bot detection logic
│   │   ├── metaTags.js             # Meta tag generation
│   │   └── __tests__/
│   │       └── botDetection.test.js
│   └── templates/
│       └── htmlTemplates.js        # HTML templates for bots and humans
├── biome.json                      # Biome configuration
├── jest.config.js                  # Jest configuration
├── package.json                    # Package configuration
├── wrangler.toml                   # Cloudflare Workers config
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Cloudflare account
- Wrangler CLI (installed automatically with dependencies)

### Installation

Install dependencies:

```bash
npm install
```

### Development

Start the local development server:

```bash
npm start
```

The worker will be available at `http://localhost:8787`

### Testing

Run tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test-watch
```

### Linting

Check code quality:

```bash
npm run lint
```

Auto-fix linting issues:

```bash
npm run lint-fix
```

### Deployment

Deploy to Cloudflare Workers:

```bash
npm run deploy
```

## How It Works

### Bot Detection

The worker examines the `User-Agent` header of incoming requests to identify bots. Common patterns include:

- Search engines: `googlebot`, `bingbot`, `duckduckbot`
- Social media: `facebookexternalhit`, `twitterbot`, `linkedinbot`
- Other crawlers: Generic patterns like `crawler`, `spider`, `bot`

### Dynamic Meta Tags

Meta tags are generated based on the URL path:

- **Home (`/`)**: General site information
- **Blog (`/blog/article-name`)**: Article-specific metadata with `type: article`
- **Product (`/product/item-name`)**: Product-specific metadata with `type: product`
- **Other paths**: Automatically formatted titles and descriptions

### Response Strategy

**For Bots:**
- Full HTML document with complete meta tags
- Open Graph tags for social media preview
- Twitter Card tags for Twitter sharing
- Structured content for optimal indexing

**For Humans:**
- Styled, interactive HTML page
- Visual indicators of edge computing
- Client-side JavaScript capabilities
- Fast initial page load

## Example Usage

Visit different paths to see dynamic meta tag generation:

- `http://localhost:8787/` - Home page
- `http://localhost:8787/blog/getting-started` - Blog article
- `http://localhost:8787/product/awesome-widget` - Product page
- `http://localhost:8787/about` - Generic page

### Testing Bot Detection

Use curl to simulate a bot:

```bash
curl -H "User-Agent: Googlebot/2.1" http://localhost:8787/blog/my-article
```

## Configuration

### Cloudflare Dashboard

When setting up your worker in the Cloudflare dashboard:

- **Project name**: `edge-compute-lab`
- **Build command**: Leave empty (no build step needed)
- **Deploy command**: `npx wrangler deploy`
- **Builds for non-production branches**: Enabled

### Wrangler Configuration

Edit `wrangler.toml` to customize your worker:

```toml
name = "edge-compute-lab"
main = "src/index.js"
compatibility_date = "2024-01-01"
```

## Customization

### Adding More Bot Patterns

Edit [src/utils/botDetection.js](src/utils/botDetection.js) and add patterns to the `BOT_PATTERNS` array:

```javascript
const BOT_PATTERNS = [
  'googlebot',
  'your-custom-bot',
  // ... more patterns
];
```

### Customizing Meta Tags

Modify [src/utils/metaTags.js](src/utils/metaTags.js) to change how meta tags are generated:

```javascript
function getPathMetadata(path) {
  // Add your custom logic here
}
```

### Changing HTML Templates

Edit [src/templates/htmlTemplates.js](src/templates/htmlTemplates.js) to customize the HTML output for bots or humans.

## Testing Bot Behavior

To test how bots see your site, use browser extensions or curl:

```bash
# Simulate Googlebot
curl -H "User-Agent: Mozilla/5.0 (compatible; Googlebot/2.1)" https://your-worker.workers.dev/

# Simulate Facebook crawler
curl -H "User-Agent: facebookexternalhit/1.1" https://your-worker.workers.dev/

# Check response headers
curl -I https://your-worker.workers.dev/
```

Look for custom headers in the response:
- `x-bot-detected`: `true` or `false`
- `x-bot-type`: The detected bot type or `none`

## Performance

- **Global edge network**: Content served from locations near your users
- **Low latency**: Typical response times under 50ms
- **Highly scalable**: Handles millions of requests with Cloudflare's infrastructure
- **No cold starts**: Workers are always warm and ready

## License

MIT License - see [LICENSE](LICENSE) for details

## Author

Adam Tigar

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.
