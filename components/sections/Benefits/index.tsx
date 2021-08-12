import { ReactElement } from 'react';
import classNames from 'classnames';

import Container from '@/components/Container';
import { Headline } from '@/components/ui';
import { BenefitsCard } from '@/components/cards';

export default function Benefits(): ReactElement {
  const cardClasses = classNames('w-1/2 mb-5', 'lg:w-full lg:max-w-sm lg:px-8');
  return (
    <section className={'text-gray-dark bg-primary'}>
      <Headline
        color="gray-dark"
        classes={classNames('text-lg font-semibold pt-16', 'lg:pt-20')}
        containerWidths={{
          sm: '10rem',
          md: '34rem',
          lg: '67rem',
        }}
      >
        Benefits
      </Headline>
      <Container
        heights={{
          sm: '100%',
          md: '100%',
          lg: '100%',
          xl: '100vh - 84px',
        }}
        classes={classNames(
          'px-4 lg:max-w-none',
          '2xl:flex 2xl:flex-col 2xl:justify-center 2xl:items-center'
        )}
      >
        <div
          className={classNames(
            'flex flex-wrap justify-center items-center -mx-3 max-w-screen-md',
            'md:mx-auto',
            'lg:max-w-screen-xl lg:pt-16',
            '2xl:-mt-48'
          )}
        >
          <BenefitsCard
            title="No Phone Numbers"
            description={[
              'Session accounts are completely anonymous.',
              'No phone number or email required.',
            ]}
            image={[
              '/assets/images/no-phone.png',
              '/assets/images/no-phone-redacted.png',
            ]}
            imageAlt="crossed out telephone"
            imageWidth="152px"
            imageHeight="152px"
            classes={classNames(cardClasses, 'lg:mb-32')}
          />
          <BenefitsCard
            title="No Data Breaches"
            description={[
              'Session doesn’t collect data,',
              'so there’s nothing to leak.',
            ]}
            image={[
              '/assets/images/no-data.png',
              '/assets/images/no-data-redacted.png',
            ]}
            imageAlt="restricted lock"
            imageWidth="174px"
            imageHeight="155px"
            classes={classNames(cardClasses, 'lg:mb-32')}
          />
          <BenefitsCard
            title="No Footprints"
            description={[
              'Send messages through our onion',
              ' routing network and leave no trace.',
            ]}
            image={[
              '/assets/images/no-footprint.png',
              '/assets/images/no-footprint-redacted.png',
            ]}
            imageAlt="footprint stop sign"
            imageWidth="159px"
            imageHeight="159px"
            classes={classNames(cardClasses, 'lg:mb-32')}
          />
          <BenefitsCard
            title="Open Source"
            description={[
              'Session’s code has nothing to hide. Anyone can',
              'view, audit, and contribute.',
            ]}
            image={[
              '/assets/images/open-source.png',
              '/assets/images/open-source-redacted.png',
            ]}
            imageAlt="open source logo"
            imageWidth="159px"
            imageHeight="159px"
            classes={classNames(cardClasses, 'lg:mb-24')}
          />
          <BenefitsCard
            title="Censorship Resistant"
            description={[
              'With no central point of failure,',
              'it’s harder to shut Session down.',
            ]}
            image={[
              '/assets/images/censorship-resistant.png',
              '/assets/images/censorship-resistant-redacted.png',
            ]}
            imageAlt="silenced person"
            imageWidth="160px"
            imageHeight="159px"
            classes={classNames(cardClasses, 'lg:mb-24')}
          />
        </div>
      </Container>
    </section>
  );
}
