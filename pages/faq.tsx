import { ReactElement } from 'react';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import classNames from 'classnames';
import { IFAQItem, IFetchFAQItemsReturn } from '@/types/cms';
import { fetchFAQItems } from '@/services/cms';

import Layout from '@/components/ui/Layout';
import Headline from '@/components/ui/Headline';
import Accordion from '@/components/ui/Accordion';

export default function FAQ(props: IFetchFAQItemsReturn): ReactElement {
  const { entries: faqItems, total: totalFaqs } = props;
  const headingClasses = classNames(
    'text-gray-dark text-3xl font-semibold mb-5'
  );
  return (
    <Layout title="Session | Frequently Asked Questions">
      <section>
        <div className={classNames('container py-6 px-2 mx-auto', 'md:p-12')}>
          <Headline
            color="gray-dark"
            showLine={false}
            classes={classNames(
              'text-lg font-mono ml-2 mt-8 mb-5',
              'md:mb-16',
              'lg:mt-4'
            )}
          >
            Frequently Asked Questions
          </Headline>
          <h2 className={headingClasses}>Intro</h2>
          <div>
            {faqItems.map((faqItem: IFAQItem, index) => {
              return (
                <Accordion
                  key={faqItem.id}
                  question={faqItem.question}
                  answer={faqItem.answer}
                />
              );
            })}
          </div>
          {/* Security */}
          {/* TODO render faq's in tag groups */}
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { entries, total } = await fetchFAQItems();
  return {
    props: {
      entries,
      total,
    },
    revalidate: 60,
  };
};
