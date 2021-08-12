import { ReactElement } from 'react';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import classNames from 'classnames';
import { IFAQItem, IFAQList } from '@/types/cms';
import { fetchFAQItems } from '@/services/cms';
import capitalize from '@/utils/capitalize';

import Layout from '@/components/ui/Layout';
import Container from '@/components/Container';
import Headline from '@/components/ui/Headline';
import Accordion from '@/components/ui/Accordion';
import METADATA from '@/constants/metadata';

interface Props {
  entries: IFAQList;
  total: number;
}

export default function FAQ(props: Props): ReactElement {
  const { entries: faqItems, total: totalFaqs } = props;
  const headingClasses = classNames('text-3xl font-semibold mb-5');
  const renderFAQList = (() => {
    const content = [];
    for (let key of Object.keys(faqItems)) {
      content.push(
        <div key={key} className="mb-10">
          <h2 className={headingClasses}>{capitalize(key, '/')}</h2>
          <div>
            {faqItems[key].map((faqItem: IFAQItem, index) => {
              return (
                <Accordion
                  key={faqItem.id}
                  question={faqItem.question}
                  answer={faqItem.answer}
                  expand={index === 0}
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
            sm: '100%',
            md: '34rem',
            lg: '67rem',
          }}
        >
          Frequently Asked Questions
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
    revalidate: 60,
  };
};
