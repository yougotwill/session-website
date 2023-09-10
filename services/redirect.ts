import getConfig from 'next/config';

// https://nextjs.org/docs/api-reference/next.config.js/redirects
export interface IRedirection {
  source: string;
  destination: string;
  permanent: boolean;
}

// NOTE should update periodically
let fallbackVersion = '1.11.2';
let lastChecked = 1694387876404; // 2023-09-11 09:18

const redirects: IRedirection[] = getConfig().serverRuntimeConfig.redirects;

async function fetchLatestVersion(repo: string) {
  // Only update once per 15 minutes
  if (lastChecked > Date.now() - 1000 * 60 * 15) {
    const res = await fetch(
      `https://api.github.com/repos/oxen-io/${repo}/releases/latest`
    );
    const data = await res.json();
    if (!data) return fallbackVersion;

    if (res.status !== 200) {
      console.warn(
        `Redirect Service: Code ${res.status} | ${data.message}`,
        `${data.documentation && `| See ${data.documentation}`}`
      );
      console.log(
        `Redirect Service: Falling back to version ${fallbackVersion}. Last checked on ${new Date(
          lastChecked
        ).toUTCString()}.}`
      );
      return fallbackVersion;
    }

    const foundVersion = data['tag_name'].split('v')[1];

    if (foundVersion && foundVersion !== fallbackVersion) {
      fallbackVersion = foundVersion;
      lastChecked = Date.now();
      console.log(
        `Redirect Service: Fetched new version from GitHub ${fallbackVersion} at ${new Date(
          lastChecked
        ).toUTCString()}.`
      );
    }
  }

  return fallbackVersion;
}

async function fetchDynamicRedirects() {
  const desktopVersion = await fetchLatestVersion('session-desktop');
  const redirects: IRedirection[] = [
    {
      source: '/linux',
      destination: `https://github.com/oxen-io/session-desktop/releases/download/v${desktopVersion}/session-desktop-linux-x86_64-${desktopVersion}.AppImage`,
      permanent: true,
    },
    {
      source: '/mac',
      destination: `https://github.com/oxen-io/session-desktop/releases/download/v${desktopVersion}/session-desktop-mac-x64-${desktopVersion}.dmg`,
      permanent: true,
    },
    {
      source: '/windows',
      destination: `https://github.com/oxen-io/session-desktop/releases/download/v${desktopVersion}/session-desktop-win-x64-${desktopVersion}.exe`,
      permanent: true,
    },
  ];
  return redirects;
}

export async function getDynamicRedirection(url: string) {
  const dynamicRedirects = await fetchDynamicRedirects();
  let redirection = '';
  dynamicRedirects.forEach((dynamicRedirection) => {
    if (url === dynamicRedirection.source) {
      redirection = dynamicRedirection.destination;
      return;
    }
  });
  return redirection;
}

export async function hasRedirection(url: string) {
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
