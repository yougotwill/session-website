import { ReactElement } from 'react';
import classNames from 'classnames';

import Headline from '@components/Headline';
import Card from '@components/Card';

export default function Benefits(): ReactElement {
  const cardClasses = classNames('w-1/2 mb-5', 'lg:w-full lg:max-w-sm lg:px-8');
  return (
    <section
      className={classNames('bg-primary text-gray-dark', 'lg:min-h-screen')}
    >
      <div className={classNames('container py-6 px-4 mx-auto', 'md:p-12')}>
        <Headline
          color="gray-dark"
          classes={classNames('ml-2 mt-8 mb-5', 'md:mb-16', 'lg:mt-4')}
        >
          Benefits
        </Headline>
        <div
          className={classNames(
            'flex flex-wrap justify-center items-center -mx-3 max-w-screen-md',
            'md:mx-auto',
            'lg:max-w-screen-xl'
          )}
        >
          <Card
            title="No Phone Numbers"
            description={[
              'Session accounts are completely anonymous.',
              'No phone number or email required.',
            ]}
            image="/assets/images/no-phone.png"
            imageAlt="crossed out telephone"
            imageWidth="152px"
            imageHeight="152px"
            classes={classNames(cardClasses, 'lg:mb-32')}
          />
          <Card
            title="No Data Breaches"
            description={[
              'Session doesn’t collect data,',
              'so there’s nothing to leak.',
            ]}
            image="/assets/images/no-data.png"
            imageAlt="restricted lock"
            imageWidth="174px"
            imageHeight="155px"
            classes={classNames(cardClasses, 'lg:mb-32')}
          />
          <Card
            title="No Footprints"
            description={[
              'Send messages through our onion',
              ' routing network and leave no trace.',
            ]}
            image="/assets/images/no-footprint.png"
            imageAlt="footprint stop sign"
            imageWidth="159px"
            imageHeight="159px"
            classes={classNames(cardClasses, 'lg:mb-32')}
          />
          <Card
            title="Open Source"
            description={[
              'Session’s code has nothing to hide. Anyone can',
              'view, audit, and contribute.',
            ]}
            image="/assets/images/open-source.png"
            imageAlt="open source logo"
            imageWidth="159px"
            imageHeight="159px"
            classes={classNames(cardClasses, 'lg:mb-24')}
          />
          <Card
            title="Censorship Resistant"
            description={[
              'With no central point of failure,',
              'it’s harder to shut Session down.',
            ]}
            image="/assets/images/censorship-resistant.png"
            imageAlt="silenced person"
            imageWidth="160px"
            imageHeight="159px"
            classes={classNames(cardClasses, 'lg:mb-24')}
          />
        </div>
      </div>
    </section>
  );
}
