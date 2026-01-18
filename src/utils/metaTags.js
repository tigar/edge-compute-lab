/**
 * Generates meta tags based on the URL path and optional data
 * @param {string} path - The URL path
 * @param {Object} data - Optional data for generating meta tags
 * @returns {Object} Meta tag data including title, description, image, etc.
 */
export function generateMetaTags(path, data = {}) {
  // Default meta tags
  const defaults = {
    title: 'Edge Compute Lab',
    description: 'Dynamic meta tag generation for bots and humans',
    image: 'https://placehold.co/1200x630/png',
    url: `https://edge-compute-lab.com${path}`,
    type: 'website',
    siteName: 'Edge Compute Lab',
  };

  // Path-based dynamic content
  const pathMeta = getPathMetadata(path);

  // Merge with custom data
  return {
    ...defaults,
    ...pathMeta,
    ...data,
  };
}

/**
 * Gets metadata based on the URL path
 * @param {string} path - The URL path
 * @returns {Object} Path-specific metadata
 */
function getPathMetadata(path) {
  // Remove trailing slash and split path
  const segments = path.replace(/\/$/, '').split('/').filter(Boolean);

  if (segments.length === 0) {
    return {
      title: 'Edge Compute Lab - Home',
      description: 'Learn about dynamic SSR and meta tag generation at the edge',
      type: 'website',
    };
  }

  // Example: /blog/post-title
  if (segments[0] === 'blog') {
    return {
      title: `${formatTitle(segments[1] || 'Blog')} - Blog`,
      description: `Read our article about ${segments[1] || 'various topics'}`,
      type: 'article',
    };
  }

  // Example: /product/product-name
  if (segments[0] === 'product') {
    return {
      title: `${formatTitle(segments[1] || 'Product')} - Products`,
      description: `Check out our ${segments[1] || 'product'}`,
      type: 'product',
    };
  }

  // Default for other paths
  return {
    title: `${formatTitle(segments[0])} - Edge Compute Lab`,
    description: `Learn more about ${segments[0]}`,
    type: 'website',
  };
}

/**
 * Formats a slug into a readable title
 * @param {string} slug - The URL slug
 * @returns {string} Formatted title
 */
function formatTitle(slug) {
  if (!slug) return '';

  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Generates Open Graph meta tag HTML
 * @param {Object} meta - Meta tag data
 * @returns {string} HTML string with Open Graph meta tags
 */
export function generateOpenGraphTags(meta) {
  return `
    <meta property="og:title" content="${escapeHtml(meta.title)}" />
    <meta property="og:description" content="${escapeHtml(meta.description)}" />
    <meta property="og:image" content="${escapeHtml(meta.image)}" />
    <meta property="og:url" content="${escapeHtml(meta.url)}" />
    <meta property="og:type" content="${escapeHtml(meta.type)}" />
    <meta property="og:site_name" content="${escapeHtml(meta.siteName)}" />
  `.trim();
}

/**
 * Generates Twitter Card meta tag HTML
 * @param {Object} meta - Meta tag data
 * @returns {string} HTML string with Twitter Card meta tags
 */
export function generateTwitterCardTags(meta) {
  return `
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(meta.title)}" />
    <meta name="twitter:description" content="${escapeHtml(meta.description)}" />
    <meta name="twitter:image" content="${escapeHtml(meta.image)}" />
  `.trim();
}

/**
 * Escapes HTML special characters to prevent XSS
 * @param {string} str - The string to escape
 * @returns {string} Escaped string
 */
function escapeHtml(str) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return str.replace(/[&<>"']/g, m => map[m]);
}
