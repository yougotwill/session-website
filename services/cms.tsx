import { createClient, ContentfulClientApi, EntryCollection } from 'contentful';
import { Document } from '@contentful/rich-text-types';
import { format, parseISO } from 'date-fns';

import {
  IFetchBlogEntriesReturn,
  IFigureImage,
  IAuthor,
  IPost,
} from '@/types/cms';
import { fetchContent } from '@/services/embed';

const client: ContentfulClientApi = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export async function fetchBlogEntries(
  quantity = 100
): Promise<IFetchBlogEntriesReturn> {
  const entries = await client.getEntries({
    content_type: 'post', // only fetch blog post entry
    order: '-fields.date',
    limit: quantity,
  });

  return generatePosts(entries);
}

export async function fetchBlogEntriesByTag(
  tag: string,
  quantity = 100
): Promise<IFetchBlogEntriesReturn> {
  const entries = await client.getEntries({
    content_type: 'post', // only fetch blog post entry
    order: '-fields.date',
    'fields.tags[in]': tag,
    limit: quantity,
  });

  return generatePosts(entries);
}

export async function fetchBlogEntryBySlug(slug: string): Promise<IPost> {
  const entries = await client.getEntries({
    content_type: 'post', // only fetch blog post entry
    'fields.slug': slug,
  });

  if (entries?.items?.length > 0) {
    const post = convertPost(entries.items[0]);
    return post;
  }

  return Promise.reject(new Error('Failed to fetch blog posts by slug'));
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

function generatePosts(
  entries: EntryCollection<unknown>
): IFetchBlogEntriesReturn {
  if (entries && entries.items && entries.items.length > 0) {
    const blogPosts = entries.items.map((entry) => convertPost(entry));
    return { posts: blogPosts, total: entries.total };
  }

  return { posts: [], total: 0 };
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
