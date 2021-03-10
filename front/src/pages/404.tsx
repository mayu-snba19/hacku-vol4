import React from 'react'
import Link from 'next/link'
import Meta from '~/components/Meta'

const Page404: React.FC = () => {
  return (
    <div>
      <Meta title="みつかりませんでした" />
      <h1>404ページ</h1>

      <Link href="/lending" passHref>
        <a>トップページへ移動する</a>
      </Link>
    </div>
  )
}

export default Page404
