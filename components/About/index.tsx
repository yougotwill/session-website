import { ReactElement } from 'react';
import classNames from 'classnames';
import redact from '@utils/redact';

import Headline from '@components/Headline';

export default function About(): ReactElement {
  const redactedClasses = redact({
    redactColor: 'primary',
    textColor: 'white',
    animate: true,
    classes: 'p-1',
  });
  return (
    <section
      className={classNames(
        'bg-gray-dark text-white',
        'lg:min-h-screen lg:pb-4'
      )}
    >
      <div
        className={classNames('container pt-6 pb-20 px-7 mx-auto', 'md:p-12')}
      >
        <Headline
          classes={classNames(
            'text-lg font-semibold mt-8 mb-20 ',
            'md:mb-16',
            'lg:mt-4'
          )}
        >
          What is Session?
        </Headline>
        <p
          className={classNames(
            'group text-white text-lg font-light leading-10 my-12',
            'md:text-4xl md:leading-relaxed md:ml-16',
            'lg:mt-48 lg:mb-10 lg:ml-14 lg:max-w-2xl'
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
