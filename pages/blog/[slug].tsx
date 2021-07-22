import { ReactElement } from 'react';
import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';

import { IPost } from '@/types/cms';
import { fetchBlogEntries, fetchBlogEntryBySlug } from '@/services/cms';
import { fetchContent } from '@/services/embed';

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

  // any embedded links in post body need metadata to be previewed
  // **Steps**
  // Find embedded links
  // Access node properties (item.data.target.fields)
  // Add metadata using an asynchronous fetch
  // Overwrite embedded link nodes
  // *Notes**
  // looping via forEach, map, etc. doesn't work because
  // the callback can't be async

  let nodeList = currentPost.body.content;
  const nodeCount = currentPost.body.content.length;
  for (let i = 0; i < nodeCount; i++) {
    if (nodeList[i].nodeType === 'embedded-entry-block') {
      const asset = nodeList[i].data.target.fields;
      // is embedded link not embedded media
      if (!asset.file) {
        asset.meta = await fetchContent(asset.url);
        nodeList[i].data.target.fields = asset;
      }
    }
  }

  // we want 6 posts excluding the current one if it's found
  const { posts } = await fetchBlogEntries(7);
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
