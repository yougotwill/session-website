import { ReactElement, ReactNode } from 'react';
import Head from 'next/head';

import Nav from '@components/Nav';
import EmailSignup from '@components/EmailSignup';
import Footer from '@components/Footer';

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
      <EmailSignup />
      <Footer />
    </>
  );
}
