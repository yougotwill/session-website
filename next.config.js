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
    domains: ['downloads.ctfassets.net', 'images.ctfassets.net'],
  },
  serverRuntimeConfig: {
    redirects: [
      {
        source: '/android',
        destination:
          'https://play.google.com/store/apps/details?id=network.loki.messenger',
        permanent: true,
      },
      {
        source: '/apk',
        destination: 'https://github.com/oxen-io/session-android/releases',
        permanent: true,
      },
      {
        source: '/iphone',
        destination:
          'https://apps.apple.com/app/session-private-messenger/id1470168868?ls=1',
        permanent: true,
      },
      {
        source: '/linux',
        destination: '/download',
        permanent: true,
      },
      {
        source: '/mac',
        destination: '/download',
        permanent: true,
      },
      {
        source: '/whitepaper',
        destination: 'https://arxiv.org/pdf/2002.04609.pdf',
        permanent: true,
      },
      {
        source: '/windows',
        destination: '/download',
        permanent: true,
      },
    ],
  },
  async redirects() {
    return this.serverRuntimeConfig.redirects;
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
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ];
  },
  target: 'serverless',
};

module.exports = withPlugins([withSvgr], config);
