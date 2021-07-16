import { createClient, ContentfulClientApi } from 'contentful';

import { CMS } from '@constants';
// import { IFigureImage, IAuthor, IPost } from '@types/cms';

const client: ContentfulClientApi = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

// TODO typescriptify
export async function fetchBlogEntries() {
  const entries = await client.getEntries({
    content_type: 'post', // only fetch blog post entry
    order: '-fields.date',
    limit: CMS.BLOG_RESULTS_PER_PAGE,
  });

  // TODO look at post converion
  if (entries && entries.items && entries.items.length > 0) {
    return { posts: entries.items, total: entries.items.length };
  }

  return { posts: [], total: 0 };
}
