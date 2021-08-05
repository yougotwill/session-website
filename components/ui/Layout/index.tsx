import { ReactElement, ReactNode } from 'react';
import Head from 'next/head';

import { Nav, Footer } from '@/components/navigation';
import { EmailSignup } from '@/components/sections';

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
      </Head>
      <Nav />
      <main>{children}</main>
      <EmailSignup />
      <Footer />
    </>
  );
}
