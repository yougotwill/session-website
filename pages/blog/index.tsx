import { ReactElement } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import classNames from 'classnames';

import { fetchBlogEntries, generateRoute } from '@/services/cms';
import { IPost } from '@/types/cms';

import { Layout } from '@/components/ui';
import { PostCard } from '@/components/cards';
import { PostList } from '@/components/posts';

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { posts, total: totalPosts } = await fetchBlogEntries();
  return {
    props: {
      posts,
    },
  };
};

interface Props {
  posts: IPost[];
}

export default function Blog(props: Props): ReactElement {
  const { posts } = props;
  const [featuredPost, ...otherPosts] = posts;
  const featuredClasses = classNames('mb-5', 'md:flex');
  return (
    <Layout title="Blog - Session Private Messenger">
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
            classes={classNames(featuredClasses)}
            key={featuredPost.id}
            {...featuredPost}
          />
        </div>
        <PostList posts={otherPosts} />
      </section>
    </Layout>
  );
}
