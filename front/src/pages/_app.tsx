import React from 'react'
import Head from 'next/head'
import LiffProvider from '~/liff/LiffProvider'
import '~/styles/globals.scss'
import type { AppProps } from 'next/app'
import Modal from 'react-modal'
import { SWRConfig } from 'swr'

Modal.setAppElement('#__next')

const SWROptions = {
  shouldRetryOnError: false,
  revalidateOnFocus: false,
}

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,viewport-fit=cover"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Yusei+Magic&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@300;400;700&family=Yusei+Magic&display=swap"
          rel="stylesheet"
        />
      </Head>
      <SWRConfig value={SWROptions}>
        <LiffProvider>
          <Component {...pageProps} />
        </LiffProvider>
      </SWRConfig>
    </>
  )
}

export default MyApp
