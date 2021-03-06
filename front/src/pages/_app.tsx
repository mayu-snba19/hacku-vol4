import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { LiffProvider } from '~/liff/useLiff'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <LiffProvider>
      <Component {...pageProps} />
    </LiffProvider>
  )
}

export default MyApp
