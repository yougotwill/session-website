import { ReactElement } from 'react';
import classNames from 'classnames';

import { fetchBlogEntries } from '@services/cms';

import Layout from '@components/layout';
import { ArticleCard } from '@components/cards';

export default function Blog(): ReactElement {
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
          <ArticleCard
            title="Privacy propaganda: The war on encryption"
            date={'June 23, 2021'}
            description={
              'Encryption is vital to defending digital privacy, but it’s being painted as the villain of the tech world. Push back against the anti-encryption agenda.'
            }
            image={'/assets/images/blog.png'}
            imageAlt="blog test image"
            classes={classNames(cardClasses)}
          />
          <ArticleCard
            title="Privacy propaganda: The war on encryption"
            date={'June 23, 2021'}
            description={
              'Encryption is vital to defending digital privacy, but it’s being painted as the villain of the tech world. Push back against the anti-encryption agenda.'
            }
            image={'/assets/images/blog.png'}
            imageAlt="blog test image"
            classes={classNames(cardClasses)}
          />
          <ArticleCard
            title="Privacy propaganda: The war on encryption"
            date={'June 23, 2021'}
            description={
              'Encryption is vital to defending digital privacy, but it’s being painted as the villain of the tech world. Push back against the anti-encryption agenda.'
            }
            image={'/assets/images/blog.png'}
            imageAlt="blog test image"
            classes={classNames(cardClasses)}
          />
          <ArticleCard
            title="Privacy propaganda: The war on encryption"
            date={'June 23, 2021'}
            description={
              'Encryption is vital to defending digital privacy, but it’s being painted as the villain of the tech world. Push back against the anti-encryption agenda.'
            }
            image={'/assets/images/blog.png'}
            imageAlt="blog test image"
            classes={classNames(cardClasses)}
          />
          <ArticleCard
            title="Privacy propaganda: The war on encryption"
            date={'June 23, 2021'}
            description={
              'Encryption is vital to defending digital privacy, but it’s being painted as the villain of the tech world. Push back against the anti-encryption agenda.'
            }
            image={'/assets/images/blog.png'}
            imageAlt="blog test image"
            classes={classNames(cardClasses)}
          />
          <ArticleCard
            title="Privacy propaganda: The war on encryption"
            date={'June 23, 2021'}
            description={
              'Encryption is vital to defending digital privacy, but it’s being painted as the villain of the tech world. Push back against the anti-encryption agenda.'
            }
            image={'/assets/images/blog.png'}
            imageAlt="blog test image"
            classes={classNames(cardClasses)}
          />
        </div>
      </section>
    </Layout>
  );
}
