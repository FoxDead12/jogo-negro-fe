import type { AppProps } from 'next/app';
import { useState } from 'react';
import { CookiesProvider } from 'react-cookie';
import "../styles/globals.css";
import Router from 'next/router';
import Loader from '../components/Loader';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  
  const [loading, setLoading] = useState(false);
  
  Router.events.on('routeChangeStart', (url) => {
    
    setLoading(true);
  })

  Router.events.on('routeChangeComplete', (url) => {
    
    setLoading(false);
  })
  

  return (
    <CookiesProvider>
      {loading && <Loader />}

      <Component {...pageProps} />
    </CookiesProvider>
  )
}
