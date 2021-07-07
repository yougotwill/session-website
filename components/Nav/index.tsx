import { ReactElement, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';

import MenuSVG from '@assets/svgs/hamburger.svg';
import CloseSVG from '@assets/svgs/close.svg';

export default function Nav(): ReactElement {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleNav = () => {
    setIsExpanded(!isExpanded);
  };
  const mobileNavButtonClasses = 'w-5 h-5 fill-current';
  const navLinkClasses = classNames(
    'w-full px-5 py-2 uppercase border-transparent border-b-3',
    'lg:px-2 lg:w-auto bg-gray-dark lg:bg-transparent',
    'transition-colors duration-300',
    'lg:hover:border-primary lg:hover:text-primary hover:bg-gray-light lg:hover:bg-transparent'
  );
  return (
    <nav
      className={classNames(
        'container relative flex flex-wrap items-center justify-between max-w-6xl px-4 mx-auto',
        'lg:h-28 lg:px-10'
      )}
    >
      <div
        className={classNames(
          'flex items-center justify-between w-full px-5 pt-7',
          'lg:w-1/3 lg:p-0'
        )}
      >
        <Link href="/">
          <a>
            <Image
              src="/assets/images/logo.png"
              alt="session logo"
              width={'196px'}
              height={'40px'}
            />
          </a>
        </Link>
        <div className={classNames('block ml-4', 'lg:hidden')}>
          <button
            className="z-10 flex items-center py-2 text-gray"
            onClick={toggleNav}
          >
            <MenuSVG
              className={classNames(
                mobileNavButtonClasses,
                isExpanded ? 'hidden' : 'block'
              )}
              title="Menu"
            />
            <CloseSVG
              className={classNames(
                mobileNavButtonClasses,
                isExpanded ? 'block' : 'hidden'
              )}
              title="Close"
            />
          </button>
        </div>
      </div>
      <div
        className={classNames(
          'fixed left-0 right-0 w-screen overflow-hidden top-20',
          'lg:relative lg:overflow-visible lg:w-2/3 lg:top-0'
        )}
      >
        <div
          className={classNames(
            'flex flex-col items-start justify-center text-sm font-light text-primary',
            'lg:text-base lg:flex-row lg:items-center lg:justify-end lg:font-semibold lg:text-gray',
            'transform transition-transform duration-300',
            isExpanded ? 'translate-y-0' : '-translate-y-full lg:translate-y-0'
          )}
        >
          <Link href="/whitepaper">
            <a className={navLinkClasses}>whitepaper</a>
          </Link>
          <Link href="https://docs.oxen.io/products-built-on-oxen/session">
            <a className={navLinkClasses} target="_blank">
              technicals
            </a>
          </Link>
          <Link href="https://github.com/oxen-io">
            <a className={navLinkClasses} target="_blank">
              github
            </a>
          </Link>
          <Link href="/blog">
            <a className={navLinkClasses}>blog</a>
          </Link>
          <Link href="/faq">
            <a className={navLinkClasses}>faq</a>
          </Link>
          <Link href="/download">
            <a className="hidden lg:inline">
              <button
                className={classNames(
                  'py-2 ml-6 font-semibold text-black  px-7 bg-primary rounded-3xl',
                  'transition-colors duration-300',
                  'hover:bg-black hover:text-primary'
                )}
              >
                Download
              </button>
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
