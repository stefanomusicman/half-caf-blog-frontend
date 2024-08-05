import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import GoogleAnalytics from '../components/GoogleAnalytics/GoogleAnalytics'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Half Caf Blog</title>
        <link rel="icon" type="image/x-icon" href="/favicon2.ico"></link>
        <meta name='description' content='Learn about all the best coffee shops in the Greater Montreal Area!' />
      </Head>
      {/* <GoogleAnalytics /> */}
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
