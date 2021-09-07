import { ReactElement } from 'react';
import { GetStaticPropsContext, GetStaticPaths } from 'next';
import classNames from 'classnames';

import { CMS } from '@/constants';
import { IPage } from '@/types/cms';
import { fetchEntryBySlug, fetchPages, generateLinkMeta } from '@/services/cms';

import Container from '@/components/Container';
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
        {page?.headline && (
          <Headline
            color="gray-dark"
            classes={classNames(
              'font-mono font-medium pt-16',
              'lg:pt-4 lg:pb-10'
            )}
            containerWidths={{
              small: '10rem',
              medium: '34rem',
              large: '768px',
            }}
          >
            {page.headline}
          </Headline>
        )}
        <Container classes={classNames('pt-0 px-4 pb-24', 'lg:pb-32')}>
          <div className={'lg:max-w-screen-md lg:mx-auto'}>
            <RichBody
              body={page?.body}
              headingClasses={'text-gray font-medium mt-6'}
              classes={classNames(
                'text-sm text-gray-lighter font-helvetica leading-loose',
                'lg:text-base'
              )}
            />
          </div>
        </Container>
      </section>
    </Layout>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const slug = String(context.params?.slug);
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
    revalidate: CMS.CONTENT_REVALIDATE_RATE,
  };
}

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
