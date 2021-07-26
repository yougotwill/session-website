import { ReactElement } from 'react';
import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';

import { IPost } from '@/types/cms';
import {
  fetchBlogEntries,
  fetchBlogEntryBySlug,
  generateLinkMeta,
} from '@/services/cms';

import { Layout } from '@/components/ui';
import { Post } from '@/components/posts';

interface Props {
  post: IPost;
  otherPosts: IPost[];
}

export default function BlogSlug(props: Props): ReactElement {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <>
        <Layout title={'Loading - Session'}>
          <h1 className={'text-gray font-bold leading-normal '}>
            Loading page...
          </h1>
        </Layout>
      </>
    );
  }
  const { post } = props;
  const pageTitle = post?.title + ' - Session';
  return (
    <>
      <Layout title={pageTitle}>
        <Post {...props} />
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const currentPost = await fetchBlogEntryBySlug(String(context.params?.slug));

  if (!currentPost) {
    return { notFound: true };
  }

  // embedded links in post body need metadata for preview
  currentPost.body = await generateLinkMeta(currentPost.body);

  // we want 6 posts excluding the current one if it's found
  const { entries: posts, total: totalPosts } = await fetchBlogEntries(7);
  const otherPosts = posts
    .filter((post) => {
      return currentPost.slug !== post.slug;
    })
    .slice(0, 6);

  return {
    props: {
      post: currentPost,
      otherPosts,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { entries: posts, total: totalPosts } = await fetchBlogEntries();
  const paths = posts.map((post) => {
    return {
      params: {
        slug: post.slug,
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
};
