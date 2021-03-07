import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

const URL = process.env.NEXT_PUBLIC_URL

type Props = {
  title?: string
  url?: string
  imageUrl?: string
}

const Meta: React.FC<Props> = ({
  title = '返してほしいでチュン',
  url,
  imageUrl = '/ogp/default',
  children,
} = {}) => {
  const router = useRouter()
  return (
    <Head>
      <meta property="og:title" content={title} />
      <meta property="og:url" content={URL + router.asPath ?? url} />
      <meta property="og:image" content={imageUrl} />
      <title>{title}</title>
      {children}
    </Head>
  )
}

export default Meta
