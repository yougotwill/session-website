const withPlugins = require('next-compose-plugins');
const withSvgr = require('next-svgr');

const fetchLatest = async (repo) => {
  const res = await fetch(
    `https://api.github.com/repos/oxen-io/${repo}/releases/latest`
  );
  const data = await res.json();
  if (!data) return;
  return data['tag_name'].split('v')[1];
};

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
  async redirects() {
    const desktopVersion = await fetchLatest('session-desktop');
    return [
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
        destination: `https://github.com/oxen-io/session-desktop/releases/download/v${desktopVersion}/session-desktop-linux-x86_64-${desktopVersion}.AppImage`,
        permanent: true,
      },
      {
        source: '/mac',
        destination: `https://github.com/oxen-io/session-desktop/releases/download/v${desktopVersion}/session-desktop-mac-${desktopVersion}.dmg`,
        permanent: true,
      },
      {
        source: '/windows',
        destination: `https://github.com/oxen-io/session-desktop/releases/download/v${desktopVersion}/session-desktop-win-${desktopVersion}.exe`,
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
