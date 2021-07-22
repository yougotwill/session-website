import { ReactElement } from 'react';
import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';

import { IPost } from '@/types/cms';
import { fetchBlogEntries, fetchBlogEntryBySlug } from '@/services/cms';
import { updateLinks } from '@/services/noembed';

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

  // start update embedded links with data

  let embeddedLinks = currentPost.body.content.filter((item) => {
    if (item.nodeType === 'embedded-entry-block') {
      const asset = item.data.target.fields;
      if (!asset.file) {
        return item;
      }
    }
  });

  embeddedLinks = embeddedLinks.map((item) => {
    return item.data.target.fields;
  });

  // console.log('embedded links', embeddedLinks);

  const updatedLinks = await updateLinks(embeddedLinks);

  // console.log('updated links', updatedLinks);

  // end update

  // update post body

  let index = 0;

  currentPost.body.content.map((item) => {
    if (item.nodeType === 'embedded-entry-block') {
      const asset = item.data.target.fields;
      if (!asset.file) {
        item = updatedLinks[index];
        index++;
      }
    }
    return item;
  });

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
