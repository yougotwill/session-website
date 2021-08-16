import getConfig from 'next/config';

// https://nextjs.org/docs/api-reference/next.config.js/redirects
export interface IRedirection {
  source: string;
  destination: string;
  permanent: boolean;
}

const staticRedirects: IRedirection[] =
  getConfig().serverRuntimeConfig.redirects;
const fallbackVersion = '1.6.10'; // should update periodcally

async function fetchLatest(repo: string) {
  const res = await fetch(
    `https://api.github.com/repos/oxen-io/${repo}/releases/latest`
  );
  const data = await res.json();
  if (!data) return fallbackVersion;

  if (res.status !== 200) {
    console.warn(
      `Redirect Service: Code ${res.status} | ${data.message} | See ${data.documentation}`
    );
    return fallbackVersion;
  }

  return data['tag_name'].split('v')[1];
}

export async function fetchRedirects() {
  const desktopVersion = await fetchLatest('session-desktop');
  const redirects: IRedirection[] = [
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
  ];
  return redirects;
}

export async function hasRedirection(url: string) {
  const dynamicRedirects = await fetchRedirects();
  if (!dynamicRedirects) return false;

  const redirects = staticRedirects.map((staticRedirection) => {
    let newRedirection = staticRedirection;
    dynamicRedirects.forEach((redirection) => {
      if (staticRedirection.source === redirection.source) {
        newRedirection = redirection;
        return;
      }
    });
    return newRedirection;
  });

  let response = null;
  redirects.forEach((redirection) => {
    if (redirection.source === url) {
      response = {
        source: redirection.source,
        destination: redirection.destination,
        permanent: redirection.permanent,
      };
    }
  });

  return response;
}
