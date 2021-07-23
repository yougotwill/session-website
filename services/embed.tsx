export interface IEmbed {
  title: string;
  url: string;
  description?: string;
  site_name?: string;
  image?: string;
}

async function fetchMetadata(targetUrl: string): Promise<IEmbed> {
  const res = await fetch(targetUrl);
  const html = await res.text();
  const cheerio = require('cheerio');
  const $ = cheerio.load(html);
  const title =
    $('meta[property="og:title"]').attr('content') ||
    $('title').text() ||
    $('meta[name="title"]').attr('content');
  const description =
    $('meta[property="og:description"]').attr('content') ||
    $('meta[name="description"]').attr('content');
  const url = $('meta[property="og:url"]').attr('content');
  const site_name = $('meta[property="og:site_name"]').attr('content');
  const image =
    $('meta[property="og:image"]').attr('content') ||
    $('meta[property="og:image:url"]').attr('content');
  return {
    title,
    description,
    url,
    site_name,
    image,
  };
}

// https://noembed.com/#supported-sites
export interface INoembed extends IEmbed {
  site_name: string;
  html: string;
  // below are not guaranteed to return
  // width?: Number;
  // cache_age?: string;
  // height?: Number | null;
  // type?: 'rich';
  // provider_url?: string;
  // author_url?: string;
  // author_name?: string;
  // version?: string;
}

export function isNoembed(object: unknown): object is INoembed {
  return Object.prototype.hasOwnProperty.call(object, 'html');
}

// fetch noembed data and render on client at run time.
// fallback is fetch and render metadata on server at build time
export async function fetchContent(
  targetUrl: string
): Promise<IEmbed | INoembed> {
  const fetchUrl = `https://noembed.com/embed?url=${targetUrl}`;
  const response = await fetch(fetchUrl);
  let data = await response.json();

  if (data.error) {
    if (data.error === 'no matching providers found') {
      if (typeof window === 'undefined') {
        const content = await fetchMetadata(targetUrl);
        data = content;
        return data;
      }
    } else {
      console.error(
        `unknown error when fetching noembed data for ${targetUrl}`
      );
    }
  }

  const content = convertToNoembed(data);
  return content;
}

function convertToNoembed(rawData: any): INoembed {
  return {
    title: rawData.title,
    url: rawData.url,
    site_name: rawData.provider_name,
    html: rawData.html,
  };
}
