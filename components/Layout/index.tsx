import { ReactElement, ReactNode } from 'react';
import Head from 'next/head';
import classNames from 'classnames';

import Nav from '@components/Nav';

interface Props {
  title: string;
  children: ReactNode;
  props?: any;
}

export default function Layout({
  title,
  children,
  ...props
}: Props): ReactElement {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
      </Head>
      <Nav />
      <main
        className={classNames(
          'container max-w-6xl p-6 mx-auto',
          'md:p-12',
          'lg:px-10'
        )}
      >
        {children}
      </main>
    </>
  );
}
