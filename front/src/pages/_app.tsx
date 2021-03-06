import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import React from 'react'
import LiffProvider from '~/liff/LiffProvider'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <LiffProvider>
      <Component {...pageProps} />
    </LiffProvider>
  )
}

export default MyApp
