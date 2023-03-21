import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '../component/layout/header';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
