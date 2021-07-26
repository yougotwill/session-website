import DOMPurify from 'isomorphic-dompurify';
import { Element } from '@/types/himalaya';

export interface IEmbed {
  title: string;
  url: string;
  description?: string;
  site_name?: string;
  image?: string;
}

function extractMetadata(html: string): IEmbed {
  const himalaya = require('himalaya');
  html = html.trim();
  const nodes = himalaya.parse(html);
  const data: IEmbed = { title: '', url: '' };

  nodes.forEach((node: Element) => {
    if (node.type === 'element' && node.tagName === 'html') {
      // use reduce
      const headNode = node.children.filter((node: Element) => {
        if (node.type === 'element' && node.tagName === 'head') {
          return node.children;
        }
      });
      // filter empty nodes
      const metaNodes = headNode[0].children.filter((node: Element) => {
        if (node.type === 'element' && node.tagName === 'meta') {
          return node;
        }
      });
      metaNodes.forEach((node: Element) => {
        if (node.attributes.length > 2) return;
        const prop = node.attributes[0]?.value;
        let content = node.attributes[1]?.value;
        if (content) {
          content = DOMPurify.sanitize(content);
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
    title: DOMPurify.sanitize(rawData.title),
    url: DOMPurify.sanitize(rawData.url),
    site_name: DOMPurify.sanitize(rawData.provider_name),
    html: DOMPurify.sanitize(rawData.html),
  };
}
