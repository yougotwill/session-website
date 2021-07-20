import { ReactElement } from 'react';
import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from 'next';

import { IPost } from '@/types/cms';
import { fetchBlogEntries, fetchBlogEntryBySlug } from '@/services/cms';

import { Layout } from '@/components/ui';
import Article from '@/components/Article';

interface Props {
  post: IPost;
}

export default function Post(props: Props): ReactElement {
  const { post } = props;
  return (
    <>
      <Layout title={post?.title}>
        <Article {...post} />
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  console.log('Building page', context.params?.slug);
  const post = await fetchBlogEntryBySlug(String(context.params?.slug));
  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { posts } = await fetchBlogEntries();
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
