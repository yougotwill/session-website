import { Block, Inline } from '@contentful/rich-text-types';

// utils for checking if hyperlinks are for the current site
// are there any links to id's i.e. #mac, #linux, #windows
// TODO links on site should be updated to follow NextJS convention on contentful?

const protocols = ['https://', 'http://'];

export function isLocal(url: string) {
  let result = true;
  protocols.forEach((protocol) => {
    if (url.indexOf(protocol) >= 0) {
      result = false;
    }
  });
  return result;
}

export function hasLocalID(node: Block | Inline) {
  let id = '';
  node.content.forEach((child) => {
    if (child.nodeType === 'hyperlink' && isLocal(child.data.uri)) {
      id = child.data.uri.split('#')[1];
    }
  });
  return id;
}
