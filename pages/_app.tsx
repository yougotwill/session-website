import { AppProps } from 'next/app';
import '@/styles/globals.css';
import lockPageTitle from '@/utils/lockPageTitle';
import { ScreenProvider } from '@/contexts/screen';

function MyApp({ Component, pageProps }: AppProps) {
  lockPageTitle();
  return (
    <>
      <ScreenProvider>
        <Component {...pageProps} />
      </ScreenProvider>
    </>
  );
}

export default MyApp;
