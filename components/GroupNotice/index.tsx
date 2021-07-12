import { ReactElement } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

export default function GroupNotice(): ReactElement {
  return (
    <div
      className={classNames(
        'bg-gray-dark text-white font-helvetica px-10 py-16 border-b border-primary border-dashed'
      )}
    >
      <h4 className={classNames('text-xl font-bold leading-none mb-2')}>
        Join the movement to keep the internet private!
      </h4>
      <p className={classNames('font-extralight leading-none')}>
        Chat with like-minded individuals in the{' '}
        <Link href="/session-open-group">
          <a
            className={classNames(
              'text-primary-dark',
              'transition-colors duration-300',
              'hover:text-white'
            )}
          >
            Sessions Open Group Channel.
          </a>
        </Link>
      </p>
    </div>
  );
}
