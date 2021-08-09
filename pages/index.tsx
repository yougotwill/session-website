import { GetStaticProps, GetStaticPropsContext } from 'next';
import { IPost } from '@/types/cms';
import { fetchBlogEntries } from '@/services/cms';
import generateRSSFeed from '@/utils/rss';

import { Layout } from '@/components/ui';
import { Hero, About, Benefits, Features } from '@/components/sections';

export default function Home() {
  return (
    <div>
      <Layout>
        <Hero />
        <About />
        <Benefits />
        <Features />
      </Layout>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  if (process.env.SITE_ENV !== 'development') {
    const posts: IPost[] = [];
    let foundAllPosts = false;

    // Contentful has limits built in
    while (!foundAllPosts) {
      const { entries, total } = await fetchBlogEntries();

      if (posts.length === total) {
        foundAllPosts = true;
        continue;
      }

      posts.push(...entries);
    }

    generateRSSFeed(posts);
  }

  return {
    props: {},
    revalidate: 3600, // update rss hourly
  };
};
