import { ReactElement } from 'react';
import classNames from 'classnames';

export default function About(): ReactElement {
  const redactedClasses = classNames(
    'bg-primary text-primary rounded-3xl p-1',
    'transition-colors duration-300',
    'group-hover:bg-gray-dark group-hover:text-white'
  );
  return (
    <section className={classNames('bg-gray-dark text-white')}>
      <div
        className={classNames(
          'container max-w-6xl p-6 mx-auto',
          'md:p-12',
          'lg:px-10'
        )}
      >
        <div
          className={classNames('flex mt-8 mb-20 pr-4 text-lg font-semibold')}
        >
          <span
            className={classNames(
              'w-1/2 border-primary border-t mt-2 mr-5 -ml-3'
            )}
          ></span>
          <span className={classNames('w-1/2 text-primary')}>
            What is Session?
          </span>
        </div>
        <p
          className={classNames(
            'group text-xl font-light leading-10 my-12',
            'lg:text-4xl'
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
