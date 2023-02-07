import { GetStaticProps, GetStaticPropsContext } from 'next';
import { IFAQItem, IFAQList } from '@/types/cms';

import Accordion from '@/components/ui/Accordion';
import { CMS } from '@/constants';
import Container from '@/components/Container';
import Headline from '@/components/ui/Headline';
import Layout from '@/components/ui/Layout';
import METADATA from '@/constants/metadata';
import { ReactElement } from 'react';
import capitalize from '@/utils/capitalize';
import classNames from 'classnames';
import { fetchFAQItems } from '@/services/cms';
import { useRouter } from 'next/router';

interface Props {
  entries: IFAQList;
  total: number;
}

export default function FAQ(props: Props): ReactElement {
  const { entries: faqItems, total: totalFaqs } = props;
  const router = useRouter();
  const slug = router.asPath.indexOf('#') >= 0 && router.asPath.split('#')[1];
  const headingClasses = classNames('text-3xl font-semibold mb-5');
  const renderFAQList = (() => {
    const content = [];
    for (let key of Object.keys(faqItems)) {
      content.push(
        <div key={key} className="mb-10">
          <h2 className={headingClasses}>{capitalize(key, '/')}</h2>
          <div>
            {faqItems[key].map((faqItem: IFAQItem) => {
              return (
                <Accordion
                  key={faqItem.id}
                  id={faqItem.slug ?? ''}
                  question={faqItem.question}
                  answer={faqItem.answer}
                  expand={!slug ? false : slug === faqItem.slug}
                />
              );
            })}
          </div>
        </div>
      );
    }
    return content;
  })();
  return (
    <Layout title="Frequently Asked Questions" metadata={METADATA.FAQ_PAGE}>
      <section>
        <Headline
          color="gray-dark"
          classes={classNames(
            'text-lg font-mono pt-12 pb-4 justify-center',
            'md:mx-0 md:justify-start',
            'lg:pt-4 lg:pb-10'
          )}
          containerWidths={{
            small: '100%',
            medium: '34rem',
            large: '67rem',
          }}
        >
          <h1>Frequently Asked Questions</h1>
        </Headline>
        <Container classes={classNames('pt-0 px-4 pb-8', 'lg:pb-12')}>
          {renderFAQList}
        </Container>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { entries: _entries, total } = await fetchFAQItems();

  // divide up faqs by tags
  const entries: IFAQList = {};

  _entries.forEach((entry: IFAQItem) => {
    if (!entries[entry.tag]) {
      entries[entry.tag] = [];
    }
    entries[entry.tag].push(entry);
  });

  return {
    props: {
      entries,
      total,
    },
    revalidate: CMS.CONTENT_REVALIDATE_RATE,
  };
};
