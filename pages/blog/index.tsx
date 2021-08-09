import { ReactElement } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import classNames from 'classnames';

import {
  fetchBlogEntries,
  fetchBlogEntriesByTag,
  generateRoute,
} from '@/services/cms';
import { IPost } from '@/types/cms';

import { Layout } from '@/components/ui';
import { PostCard } from '@/components/cards';
import { PostList } from '@/components/posts';
import METADATA from '@/constants/metadata';

interface Props {
  tag?: string;
  posts: IPost[];
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const tag = context.query.tag && String(context.query.tag);
  const { entries: posts, total: totalPosts } = tag
    ? await fetchBlogEntriesByTag(tag)
    : await fetchBlogEntries();

  const props: Props = {
    posts,
  };
  if (tag) {
    props.tag = tag;
  }
  return {
    props,
  };
};

export default function Blog(props: Props): ReactElement {
  const { posts, tag } = props;
  const [featuredPost, ...otherPosts] = posts;
  const featuredClasses = classNames('mb-5', 'md:flex');
  return (
    <Layout
      title={tag ? `${tag} Archives` : 'Blog'}
      metadata={METADATA.BLOG_PAGE}
    >
      <section>
        {tag ? (
          <div
            className={classNames(
              'text-primary-dark text-4xl font-semibold mx-auto mt-12 px-3',
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
        ) : (
          <div
            className={classNames(
              'flex justify-center items-center mx-auto mt-12',
              'md:mt-24',
              'lg:max-w-screen-xl lg:mt-16 lg:px-24'
            )}
          >
            <PostCard
              route={generateRoute(featuredPost.slug)}
              featured={true}
              classes={classNames(featuredClasses)}
              key={featuredPost.id}
              {...featuredPost}
            />
          </div>
        )}
        <PostList posts={tag ? posts : otherPosts} showHeading={false} />
      </section>
    </Layout>
  );
}
