import { ReactElement } from 'react';
import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from 'next';
import classNames from 'classnames';

import { IPage } from '@/types/cms';
import { fetchEntryBySlug, fetchPages, generateLinkMeta } from '@/services/cms';

import { Headline, Layout } from '@/components/ui';
import RichBody from '@/components/RichBody';

interface Props {
  page: IPage;
}

export default function Page(props: Props): ReactElement {
  const { page } = props;
  const headingClasses = classNames('text-gray text-2xl font-medium mt-6');
  const listClasses = classNames('list-outside ml-8 leading-loose');
  return (
    <Layout title="Terms of Service - Session">
      <section>
        <div
          className={classNames(
            'container pt-6 pb-24 px-4 mx-auto',
            'md:p-12',
            'lg:pt-0 lg:pb-32'
          )}
        >
          <Headline
            color="gray-dark"
            classes={classNames(
              'font-helvetica font-extralight mb-6',
              'md:mb-16',
              'lg:mt-4'
            )}
          >
            {page.title}
          </Headline>
          <RichBody body={page.body} classes="" />
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const page: IPage = await fetchEntryBySlug(
    String(context.params?.slug),
    'page'
  );

  if (!page) {
    return { notFound: true };
  }

  // embedded links in page body need metadata for preview
  page.body = await generateLinkMeta(page.body);

  return {
    props: {
      page,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { entries: pages, total: totalPages } = await fetchPages();
  const paths = pages.map((page) => {
    return {
      params: {
        slug: page.slug,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
};
