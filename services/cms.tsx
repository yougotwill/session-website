import { createClient, ContentfulClientApi } from 'contentful';
import moment from 'moment';

import { CMS } from '@/constants';
import {
  IFetchBlogEntriesReturn,
  IFigureImage,
  IAuthor,
  IPost,
} from '@/types/cms';

const client: ContentfulClientApi = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

// TODO typescriptify
export async function fetchBlogEntries(): Promise<IFetchBlogEntriesReturn> {
  const entries = await client.getEntries({
    content_type: 'post', // only fetch blog post entry
    order: '-fields.date',
    limit: CMS.BLOG_RESULTS_PER_PAGE,
  });

  // TODO look at post converion
  if (entries && entries.items && entries.items.length > 0) {
    const blogPosts = entries.items.map((entry) => convertPost(entry));
    return { posts: blogPosts, total: entries.total };
  }

  return { posts: [], total: 0 } as IFetchBlogEntriesReturn;
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
    publishedDate: moment(rawPost.date).format('DD MMMM YYYY'),
    slug: rawPost.slug,
    tags: rawPost?.tags, //?.map(t => t?.fields?.label) ?? [],
    title: rawPost.title,
    featureImage: convertImage(rawFeatureImage),
    author: convertAuthor(rawAuthor),
  };
}

function convertImage(rawImage: any): IFigureImage {
  return {
    imageUrl: rawImage.file.url.replace('//', 'https://'), // may need to put null check as well here
    description: rawImage.description ?? null,
    title: rawImage.title ?? null,
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
