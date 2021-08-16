import { AppProps } from 'next/app';
import '@/styles/globals.css';
import lockPageTitle from '@/utils/lockPageTitle';
import { ScreenProvider } from '@/contexts/screen';

if (process.env.SITE_ENV !== 'production' && typeof window !== 'undefined') {
  const React = require('react');
  const ReactDOM = require('react-dom');
  const axe = require('@axe-core/react');
  axe(React, ReactDOM, 1000, {});
}

function MyApp({ Component, pageProps }: AppProps) {
  lockPageTitle();
  return (
    <ScreenProvider>
      <Component {...pageProps} />
    </ScreenProvider>
  );
}

export default MyApp;
