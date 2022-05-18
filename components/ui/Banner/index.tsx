import { BANNER } from '@/constants';
import Button from '../Button';
import Link from 'next/link';
import { ReactElement } from 'react';
import classNames from 'classnames';

export default function Banner(): ReactElement {
  return (
    <div
      className={classNames(
        'bg-gray-dark text-white py-4 px-8 flex flex-col justify-center items-center leading-relaxed',
        'lg:flex-row lg:items-start'
      )}
    >
      <span className={classNames('text-center mb-4', 'lg:text-left lg:mb-0')}>
        {BANNER.TEXT}
      </span>
      <span className={classNames('flex justify-center items-center')}>
        <Link href="/download">
          <a>
            <Button
              fontWeight="bold"
              size="medium"
              classes="whitespace-nowrap mx-2"
            >
              Update now
            </Button>
          </a>
        </Link>
        <Link href="#">
          <a>
            <Button
              fontWeight="bold"
              size="medium"
              classes="whitespace-nowrap mx-2"
            >
              Read more
            </Button>
          </a>
        </Link>
      </span>
    </div>
  );
}
