export interface IMetadata {
  title: string;
  url: string;
  description?: string;
  site_name?: string;
  image?: string;
}

//https://noembed.com/#supported-sites
export interface IEmbeded extends IMetadata {
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

export function isEmbeded(object: unknown): object is IEmbeded {
  return Object.prototype.hasOwnProperty.call(object, 'html');
}

export async function fetchContent(
  targetUrl: string
): Promise<IMetadata | IEmbeded> {
  const fetchUrl = `https://noembed.com/embed?url=${targetUrl}`;
  const response = await fetch(fetchUrl);
  let data = await response.json();
  if (data.error) {
    if (data.error === 'no matching providers found') {
      if (typeof window === 'undefined') {
        const result = await fetchMetadata(targetUrl);
        data = result;
        // console.log('metadata used');
        return data;
      }
    } else {
      console.error(
        `unknown error when fetching noembed data for ${targetUrl}`
      );
    }
  }
  // console.log('noembed used');
  const content = convertNoembedContent(data);
  return content;
}

function convertNoembedContent(rawData: any): IEmbeded {
  return {
    title: rawData.title,
    url: rawData.url,
    site_name: rawData.provider_name,
    html: rawData.html,
  };
}

export async function fetchMetadata(targetUrl: string): Promise<IMetadata> {
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

export async function updateLinks(links) {
  for (let i = 0; i < links.length; i++) {
    const content = await fetchContent(links[i].url);
    links[i].data = content;
  }
  return links;
}
