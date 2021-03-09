import React from 'react'
import Head from 'next/head'
import LiffProvider from '~/liff/LiffProvider'
import '~/styles/globals.scss'
import type { AppProps } from 'next/app'
import Modal from 'react-modal'

Modal.setAppElement('#__next')

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Yusei+Magic&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@300;400;500&family=Yusei+Magic&display=swap"
          rel="stylesheet"
        />
      </Head>
      <LiffProvider>
        <Component {...pageProps} />
      </LiffProvider>
    </>
  )
}

export default MyApp
