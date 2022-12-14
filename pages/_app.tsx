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
      <Head>
        <meta name="description" content="Já ouviste falar de capoeira, ou já viste? Anda nos visitar para poderes expermentar, sente te a vontade para nos conhecer e seguirnos nas nossas redes!!"></meta>
        <meta property="locale" content="pt_PT"></meta>
        <meta property="title" content="Jogo de Negro"></meta>
        <title>Jogo de Negro</title>
        <link rel="icon" type="image/x-icon" href="/logo.jpeg"></link>
      </Head>
      <Component {...pageProps} />
    </CookiesProvider>
  )
}
