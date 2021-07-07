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
      <main>{children}</main>
    </>
  );
}
