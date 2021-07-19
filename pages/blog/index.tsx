import { ReactElement } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import classNames from 'classnames';

import { fetchBlogEntries } from '@/services/cms';
import { IPost } from '@/types/cms';

import Layout from '@/components/layout';
import { ArticleCard } from '@/components/cards';
import { Headline } from '@/components/ui';

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
  const cardClasses = classNames(
    'md:w-1/2 mb-5',
    'lg:w-1/3 lg:max-w-sm lg:px-3'
  );
  return (
    <Layout title="Blog - Session Private Messenger">
      <section>
        <div
          className={classNames(
            'flex justify-center items-center mx-auto mt-12 mb-8',
            'md:mt-24 md:mb-0',
            'lg:max-w-screen-xl lg:mt-16 lg:px-24'
          )}
        >
          <ArticleCard
            featured={true}
            classes={classNames(featuredClasses)}
            key={featuredPost.id}
            {...featuredPost}
          />
        </div>
        <Headline
          color={'gray-dark'}
          classes={classNames(
            'font-helvetica font-light text-md mx-6 mb-10',
            'md:mx-12 md:mt-8 md:mb-10',
            'lg:mx-32 lg:my-12'
          )}
        >
          More posts
        </Headline>
        <div
          className={classNames(
            'container flex flex-wrap justify-center items-center max-w-screen-md mx-auto',
            'md:justify-start',
            'lg:px-24 lg:max-w-screen-xl'
          )}
        >
          {otherPosts?.map((post) => {
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
