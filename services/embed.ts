import { Element } from '@/types/himalaya';
import sanitize from '@/utils/sanitize';

export interface IEmbed {
  title: string;
  url: string;
  description?: string;
  site_name?: string;
  image?: string;
  isExternalVideo?: boolean;
}

function extractMetadata(html: string): IEmbed {
  const himalaya = require('himalaya');
  html = html.trim();
  const nodes = himalaya.parse(html);
  const data: IEmbed = { title: '', url: '' };

  nodes.forEach((node: Element) => {
    if (node.type === 'element' && node.tagName === 'html') {
      const headNode = node.children.find((node: Element) => {
        if (node.type === 'element' && node.tagName === 'head') {
          return node.children;
        }
      });
      const metaNodes = headNode!.children.filter((node: Element) => {
        if (node.type === 'element' && node.tagName === 'meta') {
          return node;
        }
      });
      metaNodes.forEach((node: Element) => {
        if (node.attributes.length > 2) return;
        const prop = node.attributes[0]?.value;
        let content = node.attributes[1]?.value;
        if (content) {
          content = sanitize(content);
        }
        switch (prop) {
          case 'title':
          case 'og:title':
            data.title = content ?? '';
            break;
          case 'description':
          case 'og:description':
            data.description = content;
            break;
          case 'og:url':
            data.url = content ?? '';
            break;
          case 'og:site_name':
            data.site_name = content;
            break;
          case 'og:image':
          case 'og:image:url':
            data.image = content;
            break;
          default:
            break;
        }
      });
    }
  });

  return data;
}

async function fetchMetadata(targetUrl: string): Promise<IEmbed> {
  const response = await fetch(targetUrl);
  let html = await response.text();
  const data = extractMetadata(html);
  return data;
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
  const fetchUrl = `https://noembed.com/embed?url=${encodeURIComponent(
    targetUrl
  )}`;
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
  const noembed: INoembed = {
    title: sanitize(rawData.title),
    url: sanitize(rawData.url),
    site_name: sanitize(rawData.provider_name),
    html: '',
  };

  if (noembed.site_name === 'YouTube') {
    const himalaya = require('himalaya');
    const nodes = himalaya.parse(rawData.html.trim());
    nodes[0].attributes[0].value = '100%'; // width
    nodes[0].attributes[1].value = '500px'; // height
    noembed.html = himalaya.stringify(nodes);
    noembed.isExternalVideo = true;
  } else {
    noembed.html = sanitize(rawData.html);
  }

  return noembed;
}
