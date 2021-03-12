import Link from 'next/link'
import React, { useEffect } from 'react'
import Image from 'next/image'
import Meta from '~/components/Meta'
import { useLiffAuth } from '~/liff/liffHooks'
import { useRouter } from 'next/router'

const Home: React.FC = () => {
  const { user } = useLiffAuth()
  const router = useRouter()

  useEffect(() => {
    if (user != null) {
      router.push('/lending')
    }
  }, [user])

  return (
    <>
      <Meta title="返して欲しいでチュン" />
      <div
        className="rounded-full overflow-hidden shadow-lg mx-auto mt-16 relative"
        style={{ width: '200px', height: '200px' }}
      >
        <Image src="/suzume.jpg" width="200px" height="200px" />
      </div>

      <div className="animate-pulse my-16 mx-8 text-center leading-9">
        <p>しばらくするとページが遷移します</p>
        <p>少々お待ちください</p>
      </div>

      <div className="my-16 mx-8 text-center">
        <Link href="/lending" passHref>
          <a className="link">自動で遷移しない場合はこちら</a>
        </Link>
      </div>
    </>
  )
}

export default Home
