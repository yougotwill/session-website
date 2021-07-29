async function fetchLatest(repo: string) {
  const res = await fetch(
    `https://api.github.com/repos/oxen-io/${repo}/releases/latest`
  );
  const data = await res.json();
  if (!data) return;
  return data['tag_name'].split('v')[1];
}

// https://nextjs.org/docs/api-reference/next.config.js/redirects
interface IRedirection {
  source: string;
  destination: string;
  permanent: boolean;
}

async function fetchRedirects() {
  const desktopVersion = await fetchLatest('session-desktop');
  const redirects: IRedirection[] = [
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
  return redirects;
}

export async function hasRedirection(url: string) {
  let response = null;
  const redirects = await fetchRedirects();

  redirects.forEach((redirection) => {
    if (redirection.source === url) {
      // https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
      response = {
        redirect: {
          destination: redirection.destination,
          permanent: redirection.permanent,
        },
      };
    }
  });

  return response;
}
