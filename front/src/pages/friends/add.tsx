import React, { useEffect } from 'react'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Meta from '~/components/Meta'
import { addFriend } from '~/repository/friendRepository'
import { useAddFriend } from '~/adaptor/friendHooks'
import { useRouter } from 'next/router'
import Link from 'next/link'

type Props = {
  friendId: string
}

const FriendsAdd: React.FC<Props> = ({ friendId }) => {
  const { addFriend, friendName } = useAddFriend()
  const router = useRouter()
  //TODO: 初めて利用する人だった場合の対応。とりあえず利用履歴がある人と仮定して進める

  useEffect(() => {
    const func = async () => {
      try {
        await addFriend({ friendId })
      } catch {
        router.push('/lending')
      }
    }
    func()
  }, [])

  return (
    <>
      <Meta title="招待" />
      <article className="w-screen h-screen py-8 px-4">
        <div
          className="rounded-full overflow-hidden shadow-lg mx-auto mt-8"
          style={{ width: '200px', height: '200px' }}
        >
          <Image src="/suzume.jpg" width="200px" height="200px" />
        </div>
        {friendName != null && (
          <div className="mt-12">
            <p className="text-center leading-9">
              こんにちは！
              <br />
              ボクの名前はすずめだチュン
            </p>
            <p className="text-center leading-9 mt-4">
              <span className="underline bg-white rounded-md px-2 py-1 mr-2">
                {friendName}
              </span>
              さん
              <br />
              を友達登録したチュン
            </p>
            <div className="flex justify-center mt-12">
              <Link href="/lending" passHref>
                <a className="text-text px-8 py-2 text-sm rounded-sm text-center transition-all bg-brand-400">
                  OK
                </a>
              </Link>
            </div>
          </div>
        )}
      </article>
    </>
  )
}

export default FriendsAdd

type Query = {
  friendId: string
}

export const getServerSideProps: GetServerSideProps<Props, Query> = async ({
  query,
}) => {
  if (query?.friendId == null) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      friendId: query?.friendId.toString(),
    },
  }
}
