import { ReactElement, ReactNode, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';

export default function Nav(): ReactElement {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleNav = () => {
    setIsExpanded(!isExpanded);
  };
  const mobileNavToggleClasses = 'w-5 h-5 fill-current';
  return (
    <nav className="container relative flex flex-wrap items-center justify-between max-w-5xl mx-auto lg:h-28">
      <div className="flex items-center justify-between w-full px-4 pt-7 lg:w-1/3 lg:p-0">
        <Link href="/">
          <a>
            <Image
              src="/resources/images/logo.png"
              alt="logo"
              width={'196px'}
              height={'40px'}
            />
          </a>
        </Link>
        <div className={classNames('inline-block lg:hidden')}>
          <button
            className="z-10 flex items-center py-2 text-gray"
            onClick={toggleNav}
          >
            <svg
              id="menu-open"
              className={classNames(
                mobileNavToggleClasses,
                isExpanded ? 'hidden' : 'block'
              )}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
            <svg
              id="menu-close"
              className={classNames(
                mobileNavToggleClasses,
                isExpanded ? 'block' : 'hidden'
              )}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Close</title>
              <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="fixed left-0 right-0 w-screen overflow-hidden top-20 lg:relative lg:overflow-visible lg:w-2/3 lg:top-0">
        <div
          className={classNames(
            'flex flex-col items-start justify-center text-sm font-light lg:text-base lg:flex-row lg:items-center lg:justify-end lg:font-semibold text-primary lg:text-gray',
            'transform transition-transform duration-300',
            isExpanded ? 'translate-y-0' : '-translate-y-full lg:translate-y-0'
          )}
        >
          <Link href="/whitepaper">
            <a className="w-full px-5 pt-3 pb-5 uppercase lg:px-2 lg:py-0 lg:w-auto bg-gray-dark lg:bg-transparent">
              whitepaper
            </a>
          </Link>
          <Link href="https://docs.oxen.io/products-built-on-oxen/session">
            <a
              className="w-full px-5 pb-5 uppercase lg:px-2 lg:w-auto bg-gray-dark lg:bg-transparent lg:py-0"
              target="_blank"
            >
              technicals
            </a>
          </Link>
          <Link href="https://github.com/oxen-io">
            <a
              className="w-full px-5 pb-5 uppercase lg:px-2 lg:w-auto bg-gray-dark lg:bg-transparent lg:py-0"
              target="_blank"
            >
              github
            </a>
          </Link>
          <Link href="/blog">
            <a className="w-full px-5 pb-5 uppercase lg:px-2 lg:w-auto bg-gray-dark lg:bg-transparent lg:py-0">
              blog
            </a>
          </Link>
          <Link href="/faq">
            <a className="w-full px-5 pb-3 uppercase lg:px-2 lg:w-auto bg-gray-dark lg:bg-transparent lg:py-0">
              faq
            </a>
          </Link>
          <Link href="/download">
            <a className="hidden lg:inline">
              <button className="py-2 ml-6 font-semibold text-black transition-colors px-7 bg-primary rounded-3xl hover:bg-black hover:text-primary">
                Download
              </button>
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
