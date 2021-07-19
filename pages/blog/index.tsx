import { ReactElement } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import classNames from 'classnames';

import { fetchBlogEntries } from '@/services/cms';
import { IPost } from '@/types/cms';

import Layout from '@/components/layout';
import { ArticleCard } from '@/components/cards';

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
  const cardClasses = classNames(
    'md:w-1/2 mb-5',
    'lg:w-full lg:max-w-sm lg:px-2'
  );
  return (
    <Layout title="Blog - Session Private Messenger">
      <section className={classNames('flex flex-wrap mt-12')}>
        <div
          className={classNames(
            'flex flex-wrap justify-center items-center max-w-screen-md',
            'md:mx-auto',
            'lg:max-w-screen-xl'
          )}
        >
          {posts?.map((post) => {
            return (
              <ArticleCard
                classes={classNames(cardClasses)}
                key={post.id}
                {...post}
              />
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
