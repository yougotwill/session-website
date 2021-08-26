import { ReactElement } from 'react';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import classNames from 'classnames';

import { fetchBlogEntries, generateRoute } from '@/services/cms';
import { IPost } from '@/types/cms';

import { Layout } from '@/components/ui';
import { PostCard } from '@/components/cards';
import { PostList } from '@/components/posts';
import METADATA from '@/constants/metadata';

interface Props {
  posts: IPost[];
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { entries: posts, total: totalPosts } = await fetchBlogEntries();

  return {
    props: { posts },
    revalidate: 3600, // refresh hourly
  };
};

export default function Blog(props: Props): ReactElement {
  const { posts } = props;
  const [featuredPost, ...otherPosts] = posts;
  return (
    <Layout title={'Blog'} metadata={METADATA.BLOG_PAGE}>
      <section>
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
            classes={classNames('mb-5', 'md:flex')}
            key={featuredPost.id}
            {...featuredPost}
          />
        </div>
        <PostList posts={otherPosts} />
      </section>
    </Layout>
  );
}
