import { ReactElement } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import redact from '@utils/redact';

import Headline from '@components/Headline';
import Card from '@components/Card';

export default function Benefits(): ReactElement {
  const redactedClasses = redact({
    redactColor: 'gray-dark',
    textColor: 'gray-dark',
  });
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
            'flex flex-wrap justify-center items-center -mx-3'
          )}
        >
          <Card
            title="No Phone Numbers"
            image="/assets/images/no-phone.png"
            imageAlt="crossed out telephone"
            imageWidth="152px"
            imageHeight="152px"
            classes="w-1/2 mb-5"
          />
          <Card
            title="No Data Breaches"
            image="/assets/images/no-data.png"
            imageAlt="restricted lock"
            imageWidth="174px"
            imageHeight="155px"
            classes="w-1/2 mb-5"
          />
          <Card
            title="No Footprints"
            image="/assets/images/no-footprint.png"
            imageAlt="footprint stop sign"
            imageWidth="159px"
            imageHeight="159px"
            classes="w-1/2 mb-5"
          />
          <Card
            title="Open Source"
            image="/assets/images/open-source.png"
            imageAlt="open source logo"
            imageWidth="159px"
            imageHeight="159px"
            classes="w-1/2 mb-5"
          />
          <Card
            title="Censorship Resistant"
            image="/assets/images/censorship-resistant.png"
            imageAlt="silenced person"
            imageWidth="160px"
            imageHeight="159px"
            classes="w-1/2 mb-5"
          />
        </div>
      </div>
    </section>
  );
}
