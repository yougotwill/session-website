import { ReactElement } from 'react';
import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from 'next';

import { IPost } from '@/types/cms';
import {
  fetchBlogEntries,
  fetchEntryBySlug,
  generateLinkMeta,
} from '@/services/cms';

import { Layout } from '@/components/ui';
import { Post } from '@/components/posts';
import METADATA from '@/constants/metadata';

interface Props {
  post: IPost;
  otherPosts: IPost[];
}

export default function BlogSlug(props: Props): ReactElement {
  const { post } = props;
  return (
    <>
      <Layout
        title={post.title}
        metadata={{
          TYPE: 'article',
          DESCRIPTION: post.description,
          OG_IMAGE: {
            URL: post.featureImage?.imageUrl ?? METADATA.OG_IMAGE.URL,
            WIDTH: Number(post.featureImage?.width) ?? METADATA.OG_IMAGE.WIDTH,
            HEIGHT:
              Number(post.featureImage?.height) ?? METADATA.OG_IMAGE.HEIGHT,
            ALT: post.featureImage?.title ?? METADATA.OG_IMAGE.ALT,
          },
          TAGS: post.tags,
          ARTICLE_SECTION: post.tags[0],
          PUBLISHED_TIME: post.publishedDateISO,
        }}
      >
        <Post {...props} />
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const currentPost: IPost = await fetchEntryBySlug(
    String(context.params?.slug),
    'post'
  );

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
    fallback: false,
  };
};
