const withPlugins = require('next-compose-plugins');
const withSvgr = require('next-svgr');

const config = {
  // .env.local doesn't load itself
  env: {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
    CAMPAIGN_MONITOR_CLIENT_ID: process.env.CAMPAIGN_MONITOR_CLIENT_ID,
    CAMPAIGN_MONITOR_API_KEY: process.env.CAMPAIGN_MONITOR_API_KEY,
    CAMPAIGN_MONITOR_LIST_API_ID: process.env.CAMPAIGN_MONITOR_LIST_API_ID,
  },
  images: {
    domains: ['images.ctfassets.net'],
  },
  async rewrites() {
    return [
      {
        source: '/feed',
        destination: '/api/feed/rss',
      },
      {
        // The /:slug part is a generic parameter handler to catch all other cases
        source: '/feed/:slug',
        destination: '/api/feed/:slug',
      },
    ];
  },
  target: 'serverless',
};

module.exports = withPlugins([withSvgr], config);
