//https://noembed.com/#supported-sites

export interface IEmbeded {
  title: string;
  url: string;
  provider_name: string;
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

export async function fetchContent(url: string) {
  const fetchUrl = `https://noembed.com/embed?url=${url}`;
  try {
    const response = await fetch(fetchUrl);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(`noembed: data fetch failed for ${url}`);
    console.log(err);
  }
}

export function convertContent(rawData: any): IEmbeded {
  return {
    title: rawData.title,
    url: rawData.url,
    provider_name: rawData.provider_name,
    html: rawData.html,
  };
}
