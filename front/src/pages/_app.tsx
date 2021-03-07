import React, { useState } from 'react'
import Head from 'next/head'
import LiffProvider from '~/liff/LiffProvider'
import '~/styles/globals.scss'
import type { AppProps } from 'next/app'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <LiffProvider>
        <Component {...pageProps} />
      </LiffProvider>
    </>
  )
}

export default MyApp
