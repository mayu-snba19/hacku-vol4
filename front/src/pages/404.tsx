import React from 'react'
import Link from 'next/link'

const Page404: React.FC = () => {
  return (
    <div>
      <h1>404ページ</h1>

      <Link href="/lending" passHref>
        <a>トップページへ移動する</a>
      </Link>
    </div>
  )
}

export default Page404
