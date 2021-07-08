import { ReactElement } from 'react';
import classNames from 'classnames';
import redacted from '@utils/redacted';

import Headline from '@components/Headline';

export default function About(): ReactElement {
  const redactedClasses = redacted({
    redactColor: 'primary',
    textColor: 'white',
  });
  return (
    <section
      className={classNames('bg-gray-dark text-white', 'lg:min-h-screen')}
    >
      <div className={classNames('container p-6 mx-auto', 'md:p-12')}>
        <Headline>What is Session?</Headline>
        <p
          className={classNames(
            'group text-xl font-light leading-10 my-12',
            'md:text-4xl md:leading-relaxed md:ml-16',
            'lg:mt-48 lg:mb-10 lg:ml-14, lg:max-w-2xl'
          )}
        >
          Session is an <span className={redactedClasses}>end-to-end</span>{' '}
          encrypted messenger that minimises{' '}
          <span className={redactedClasses}>sensitive</span> metadata,{' '}
          <span className={redactedClasses}>designed and built</span> for people
          who want <span className={redactedClasses}>absolute</span> privacy and
          freedom from <span className={redactedClasses}>any form of</span>{' '}
          surveillance.
        </p>
      </div>
    </section>
  );
}
