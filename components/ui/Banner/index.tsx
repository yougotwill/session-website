import { BANNER } from '@/constants';
import Button from '../Button';
import Link from 'next/link';
import { ReactElement } from 'react';
import classNames from 'classnames';
import { useScreen } from '@/contexts/screen';

export default function Banner(): ReactElement {
  const { isSmall } = useScreen();
  return (
    <div
      className={classNames(
        'bg-gray-dark text-white py-4 px-8 flex flex-col justify-center items-center leading-relaxed align-middle',
        'lg:flex-row',
        '2xl:items-center'
      )}
    >
      <span className={classNames('text-center', 'lg:text-left lg:mb-0')}>
        {isSmall ? BANNER.TEXT.MOBILE : BANNER.TEXT.DESKTOP}
      </span>
      <span
        className={classNames('flex justify-center items-center', '2xl:ml-4')}
      >
        <Link href="/blog/upgrading-to-session-network">
          <a>
            <Button
              fontWeight="bold"
              size="medium"
              classes="whitespace-nowrap mx-2"
            >
              Learn more
            </Button>
          </a>
        </Link>
      </span>
    </div>
  );
}
