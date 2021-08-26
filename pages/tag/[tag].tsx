import { ReactElement } from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import classNames from 'classnames';

import { METADATA } from '@/constants';
import { IPost, ITagList } from '@/types/cms';
import { fetchBlogEntriesByTag, fetchTagList } from '@/services/cms';

import { Layout } from '@/components/ui';
import { PostList } from '@/components/posts';

interface Props {
  tag: string;
  posts: IPost[];
}

export default function Tag(props: Props): ReactElement {
  const { tag, posts } = props;
  return (
    <Layout title={`${tag} Archives`} metadata={METADATA.BLOG_PAGE}>
      <section>
        <div
          className={classNames(
            'text-primary-dark text-4xl font-bold mx-auto mt-12 px-3',
            'md:mt-16 md:mb-8',
            'lg:max-w-6xl lg:mt-8 lg:px-10'
          )}
        >
          <h1
            className={classNames(
              'bg-gray-50 border border-gray-200 py-3 px-2',
              'lg:max-w-4xl'
            )}
          >
            {tag}
          </h1>
        </div>
        <PostList posts={posts} showHeading={false} />
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const tag = String(context.params?.tag);
  const { entries: posts, total: totalPosts } = await fetchBlogEntriesByTag(
    tag
  );

  return {
    props: { tag, posts },
    revalidate: 3600, // refresh hourly
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const tags: ITagList = await fetchTagList();
  const paths = Object.values(tags).map((tag) => {
    return {
      params: {
        tag,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};
