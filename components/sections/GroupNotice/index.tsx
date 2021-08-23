import { ReactElement } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

interface Props {
  classes?: string;
}

export default function GroupNotice(props: Props): ReactElement {
  const { classes } = props;
  return (
    <div
      className={classNames(
        'bg-gray-dark text-white font-helvetica px-10 py-16 border-b border-primary border-dashed',
        'md:py-12',
        classes
      )}
    >
      <h4 className={classNames('text-xl font-bold leading-none mb-2')}>
        Join the movement to keep the internet private!
      </h4>
      <p className={classNames('leading-none')}>
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
