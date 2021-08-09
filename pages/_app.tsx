import { AppProps } from 'next/app';
import '@/styles/globals.css';
import lockPageTitle from '@/utils/lockPageTitle';

function MyApp({ Component, pageProps }: AppProps) {
  lockPageTitle();
  return <Component {...pageProps} />;
}

export default MyApp;
