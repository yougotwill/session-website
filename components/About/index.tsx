import { ReactElement } from 'react';
import classNames from 'classnames';

export default function About(): ReactElement {
  const redactedClasses = classNames(
    'bg-primary text-primary rounded-3xl p-1',
    'transition-colors duration-1000',
    'group-hover:bg-transparent group-hover:text-white group-hover:duration-100'
  );
  return (
    <section
      className={classNames('bg-gray-dark text-white', 'lg:min-h-screen')}
    >
      <div className={classNames('container p-6 mx-auto', 'md:p-12')}>
        <div
          className={classNames(
            'flex mt-8 mb-20 pr-4 text-lg font-medium',
            'md:mb-16',
            'lg:mt-4'
          )}
        >
          <span
            className={classNames(
              'w-36 border-primary border-t mt-2 mr-5 -ml-3',
              'md:-ml-9',
              'lg:-ml-28'
            )}
          ></span>
          <span className={classNames('w-1/2 text-primary')}>
            What is Session?
          </span>
        </div>
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
