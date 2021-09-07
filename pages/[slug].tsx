import { ReactElement } from 'react';
import { GetStaticPropsContext, GetStaticPaths } from 'next';

import { CMS } from '@/constants';
import { IPage, IPost, isPost } from '@/types/cms';
import {
  fetchBlogEntries,
  fetchEntryBySlug,
  fetchPages,
  generateLinkMeta,
} from '@/services/cms';

import BlogPost from '@/components/BlogPost';
import RichPage from '@/components/RichPage';

interface Props {
  content: IPage | IPost;
  otherPosts?: IPost[];
}

export default function Page(props: Props): ReactElement {
  const { content } = props;
  if (isPost(content)) {
    return <BlogPost post={content} otherPosts={props.otherPosts} />;
  } else {
    return <RichPage page={content} />;
  }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const slug = String(context.params?.slug);
  const content: IPage | IPost = await fetchEntryBySlug(slug);

  if (!content) {
    return { notFound: true };
  }

  // embedded links in content body need metadata for preview
  content.body = await generateLinkMeta(content.body);

  const props: Props = { content };

  if (isPost(content)) {
    // we want 6 posts excluding the current one if it's found
    const { entries: posts, total: totalPosts } = await fetchBlogEntries(7);
    const otherPosts = posts
      .filter((post) => {
        return content.slug !== post.slug;
      })
      .slice(0, 6);
    props.otherPosts = otherPosts;
  }

  return {
    props,
    revalidate: CMS.CONTENT_REVALIDATE_RATE,
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { entries: pages, total: totalPages } = await fetchPages();
  const pagePaths = pages.map((page) => {
    return {
      params: {
        slug: page.slug,
      },
    };
  });

  const { entries: posts, total: totalPosts } = await fetchBlogEntries();
  const postPaths = posts.map((post) => {
    return {
      params: {
        slug: post.slug,
      },
    };
  });

  return {
    paths: [...pagePaths, ...postPaths],
    fallback: false,
  };
};
