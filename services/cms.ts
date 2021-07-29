import { createClient, ContentfulClientApi, EntryCollection } from 'contentful';
import { Document } from '@contentful/rich-text-types';
import { format, parseISO } from 'date-fns';

import {
  IFigureImage,
  IAuthor,
  IPost,
  IFAQItem,
  IPage,
  IFetchEntriesReturn,
  IFetchBlogEntriesReturn,
  IFetchFAQItemsReturn,
  IFetchPagesReturn,
} from '@/types/cms';
import { fetchContent } from '@/services/embed';

const client: ContentfulClientApi = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export async function fetchBlogEntries(
  quantity = 100
): Promise<IFetchBlogEntriesReturn> {
  const options: any = {
    content_type: 'post', // only fetch blog post entry
    order: '-fields.date',
    limit: quantity,
  };

  // only show 'live' posts in production
  if (process.env.SITE_ENV == 'production') {
    options['fields.live'] = true;
  }

  const _entries = await client.getEntries(options);

  const results = generateEntries(_entries, 'post');
  return {
    entries: results.entries as Array<IPost>,
    total: results.total,
  };
}

export async function fetchBlogEntriesByTag(
  tag: string,
  quantity = 100
): Promise<IFetchBlogEntriesReturn> {
  const options: any = {
    content_type: 'post', // only fetch blog post entry
    order: '-fields.date',
    'fields.tags[in]': tag,
    limit: quantity,
  };

  // only show 'live' posts in production
  if (process.env.SITE_ENV == 'production') {
    options['fields.live'] = true;
  }

  const _entries = await client.getEntries(options);

  const results = generateEntries(_entries, 'post');
  return {
    entries: results.entries as Array<IPost>,
    total: results.total,
  };
}

export async function fetchEntryBySlug(
  slug: string,
  entryType: 'post' | 'page'
): Promise<any> {
  const _entries = await client.getEntries({
    content_type: entryType, // only fetch specific type
    'fields.slug': slug,
  });

  if (_entries?.items?.length > 0) {
    let entry;
    switch (entryType) {
      case 'post':
        entry = convertPost(_entries.items[0]);
        break;
      case 'page':
        entry = convertPage(_entries.items[0]);
        break;
      default:
        break;
    }
    return entry;
  }

  return Promise.reject(new Error(`Failed to fetch ${entryType} by slug`));
}

function convertPost(rawData: any): IPost {
  const rawPost = rawData.fields;
  const rawFeatureImage = rawPost?.featureImage
    ? rawPost?.featureImage.fields
    : null;
  const rawAuthor = rawPost.author ? rawPost.author.fields : null;

  return {
    id: rawData.sys.id ?? null,
    body: rawPost.body ?? null,
    subtitle: rawPost.subtitle ?? null,
    description: rawPost.description ?? null,
    publishedDate: format(parseISO(rawPost.date), 'MMMM dd, yyyy'),
    slug: rawPost.slug,
    tags: rawPost?.tags, //?.map(t => t?.fields?.label) ?? [],
    title: rawPost.title,
    featureImage: convertImage(rawFeatureImage),
    fullHeader: rawPost.fullHeader ?? null,
    author: convertAuthor(rawAuthor),
  };
}

function convertImage(rawImage: any): IFigureImage {
  return {
    imageUrl: rawImage.file.url.replace('//', 'https://'), // may need to put null check as well here
    description: rawImage.description ?? null,
    title: rawImage.title ?? null,
    width: rawImage.file.details.image.width,
    height: rawImage.file.details.image.height,
  };
}

function convertAuthor(rawAuthor: any): IAuthor {
  return {
    name: rawAuthor?.name ?? null,
    avatar: convertImage(rawAuthor.avatar.fields),
    shortBio: rawAuthor?.shortBio ?? null,
    position: rawAuthor?.position ?? null,
    email: rawAuthor?.email ?? null,
    twitter: rawAuthor?.twitter ?? null,
    facebook: rawAuthor.facebook ?? null,
    github: rawAuthor.github ?? null,
  };
}

function generateEntries(
  entries: EntryCollection<unknown>,
  entryType: 'post' | 'faq' | 'page'
): IFetchEntriesReturn {
  let _entries: any = [];
  if (entries && entries.items && entries.items.length > 0) {
    switch (entryType) {
      case 'post':
        _entries = entries.items.map((entry) => convertPost(entry));
        break;
      case 'faq':
        _entries = entries.items.map((entry) => convertFAQ(entry));
        break;
      case 'page':
        _entries = entries.items.map((entry) => convertPage(entry));
        break;
      default:
        break;
    }
    return { entries: _entries, total: entries.total };
  }

  return { entries: _entries, total: 0 };
}

export function generateRoute(slug: string): string {
  const route =
    slug.indexOf('/blog/') > 0 ? slug.split('/blog/')[1] : '/blog/' + slug;
  return route;
}

export async function generateLinkMeta(doc: Document): Promise<Document> {
  const promises = doc.content.map(async (node) => {
    if (node.nodeType === 'embedded-entry-block') {
      // is embedded link not embedded media
      if (!node.data.target.fields.file) {
        node.data.target.fields.meta = await fetchContent(
          node.data.target.fields.url
        );
      }
    }
  });
  await Promise.all(promises);
  return doc;
}

export async function fetchFAQItems(): Promise<IFetchFAQItemsReturn> {
  const _entries = await client.getEntries({
    content_type: 'faq_item', // only fetch faq items
    order: 'fields.id',
  });

  const results = generateEntries(_entries, 'faq');
  return { entries: results.entries as Array<IFAQItem>, total: results.total };
}

function convertFAQ(rawData: any): IFAQItem {
  const rawFAQ = rawData.fields;
  const { question, answer, id, tag } = rawFAQ;

  return {
    id: id ?? null,
    question: question ?? null,
    answer: answer ?? null,
    tag: tag ?? null,
  };
}

export async function fetchPages(quantity = 100): Promise<IFetchPagesReturn> {
  const _entries = await client.getEntries({
    content_type: 'page',
    limit: quantity,
  });

  const results = generateEntries(_entries, 'page');
  return {
    entries: results.entries as Array<IPage>,
    total: results.total,
  };
}

function convertPage(rawData: any): IPage {
  const rawPage = rawData.fields;

  return {
    title: rawPage.title,
    slug: rawPage.slug,
    headline: rawPage.headline ?? null,
    body: rawPage.body,
  };
}
