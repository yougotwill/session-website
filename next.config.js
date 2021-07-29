const withPlugins = require('next-compose-plugins');
const withSvgr = require('next-svgr');

const config = {
  // .env.local doesn't load itself
  env: {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
  },
  images: {
    domains: ['images.ctfassets.net'],
  },
  target: 'serverless',
};

module.exports = withPlugins([withSvgr], config);
