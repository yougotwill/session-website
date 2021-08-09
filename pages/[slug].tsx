import { ReactElement } from 'react';
import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from 'next';
import classNames from 'classnames';

import { IPage } from '@/types/cms';
import { fetchEntryBySlug, fetchPages, generateLinkMeta } from '@/services/cms';
import { hasRedirection } from '@/services/redirect';

import { Headline, Layout } from '@/components/ui';
import RichBody from '@/components/RichBody';

interface Props {
  page: IPage;
}

export default function Page(props: Props): ReactElement {
  const { page } = props;
  const pageTitle = page ? page.title : '';
  return (
    <Layout title={pageTitle}>
      <section>
        <div
          className={classNames(
            'container pt-6 pb-24 px-4 mx-auto',
            'md:p-12',
            'lg:pt-0 lg:pb-32'
          )}
        >
          {page?.headline && (
            <Headline
              color="gray-dark"
              classes={classNames(
                'font-helvetica font-extralight mb-6',
                'md:mb-16',
                'lg:mt-4'
              )}
            >
              {page.headline}
            </Headline>
          )}
          <div className={'lg:max-w-screen-md lg:mx-auto'}>
            <RichBody
              body={page?.body}
              headingClasses={'text-gray font-medium mt-6'}
              classes={classNames(
                'text-sm text-gray-lighter font-helvetica font-extralight leading-loose',
                'lg:text-base'
              )}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const slug = String(context.params?.slug);

  const isRedirect = await hasRedirection('/' + slug);
  if (isRedirect) return isRedirect;

  const page: IPage = await fetchEntryBySlug(slug, 'page');

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
    fallback: false,
  };
};
