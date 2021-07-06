import { ReactElement, ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Nav(): ReactElement {
  return (
    <nav className="container flex flex-wrap items-center justify-between max-w-5xl mx-auto font-semibold h-28 text-gray">
      <div className="w-1/3">
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
      </div>
      <div className="w-2/3 text-right">
        <Link href="/whitepaper">
          <a className="px-2 uppercase">whitepaper</a>
        </Link>
        <Link href="https://docs.oxen.io/products-built-on-oxen/session">
          <a className="px-2 uppercase" target="_blank">
            technicals
          </a>
        </Link>
        <Link href="https://github.com/oxen-io">
          <a className="px-2 uppercase" target="_blank">
            github
          </a>
        </Link>
        <Link href="/blog">
          <a className="px-2 uppercase">blog</a>
        </Link>
        <Link href="/faq">
          <a className="px-2 uppercase">faq</a>
        </Link>
        <Link href="/download">
          <a>
            <button className="py-2 ml-6 font-semibold text-black transition-colors px-7 bg-primary rounded-3xl hover:bg-black hover:text-primary">
              Download
            </button>
          </a>
        </Link>
      </div>
    </nav>
  );
}
