const withPlugins = require('next-compose-plugins');
const withSvgr = require('next-svgr');

const appVersion = 'v1.6.7';
const config = {
  target: 'serverless',
  async redirects() {
    return [
      {
        source: '/android',
        destination:
          'https://play.google.com/store/apps/details?id=network.loki.messenger',
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
        destination: `https://github.com/oxen-io/session-desktop/releases/download/${appVersion}/session-desktop-linux-x86_64-1.6.7.AppImage`,
        permanent: true,
      },
      {
        source: '/mac',
        destination: `https://github.com/oxen-io/session-desktop/releases/download/${appVersion}/session-desktop-mac-1.6.7.dmg`,
        permanent: true,
      },
      {
        source: '/windows',
        destination: `https://github.com/oxen-io/session-desktop/releases/download/${appVersion}/session-desktop-win-1.6.7.exe`,
        permanent: true,
      },
      {
        source: '/whitepaper',
        destination: 'https://arxiv.org/pdf/2002.04609.pdf',
        permanent: true,
      },
    ];
  },
};

module.exports = withPlugins([withSvgr], config);
