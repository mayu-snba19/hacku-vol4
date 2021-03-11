import React, { useEffect, useState } from 'react'
import Meta from '~/components/Meta'
import Image from 'next/image'
import Link from 'next/link'
import type { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Modal from '~/components/Modal'
import { useLinkLendingInfo } from '~/adaptor/lendingInfoHooks'
import { BorrowingInfo } from '~/types/lendingInfo'
import { useLiffAccessToken } from '~/liff/liffHooks'

type Props = {
  lendingId: string
}

// 最初の利用か
const isFirst = true

const LendingLinkPage: React.FC<Props> = ({ lendingId }) => {
  const router = useRouter()
  const accessToken = useLiffAccessToken()
  const linkLendingInfo = useLinkLendingInfo()
  const [borrowingInfo, setBorrowingInfo] = useState<BorrowingInfo | null>(null)

  const [isOpenTermsOfUseModal, setIsOpenTermsOfUseModal] = useState(false)

  useEffect(() => {
    if (accessToken != null) {
      handleLinkLending()
    }
  }, [accessToken])

  const handleLinkLending = async () => {
    const borrowingInfo = await linkLendingInfo(lendingId)
    if (borrowingInfo == null) {
      router.push('/lending')
      return
    }
    setBorrowingInfo(borrowingInfo)
  }

  const handleSend = () => {
    const url = isFirst
      ? `/lending?first=true&lendingId=${encodeURIComponent(lendingId)}`
      : `/lending?lendingId=${encodeURIComponent(lendingId)}`
    router.push(url, '/lending', {})
  }
  return (
    <>
      <Meta title="借物登録完了" />
      <article className="w-screen h-screen py-8 px-4">
        <div
          className="rounded-full overflow-hidden shadow-lg mx-auto"
          style={{ width: '200px', height: '200px' }}
        >
          <Image src="/suzume.jpg" width="200px" height="200px" />
        </div>
        {borrowingInfo != null && (
          <div className="leading-9">
            <p className="text-center mt-8">
              こんにちは！
              <br />
              ボクの名前はすずめだちゅん。
            </p>
            <p className="mt-8 text-center">
              <span className="underline bg-white rounded-md px-2 py-1">
                {borrowingInfo.ownerName}さん
              </span>
              <br />
              から
              <br />
              <span className="underline bg-white rounded-md px-2 py-1">
                {borrowingInfo.content}
              </span>
              <br />
              を借りたって聞いたけど、あってるちゅんか？
            </p>
            <div className="text-center">
              <button className="bg-gray-100 text-gray-500 px-4 py-2 my-4 rounded-md mr-8">
                いいえ
              </button>
              {/* NOTE: 今後の拡張のためにbuttonで実装 */}
              <button
                className="bg-brand-400 text-text px-8 py-2 my-4 rounded-md"
                onClick={() => {
                  isFirst ? setIsOpenTermsOfUseModal(true) : handleSend()
                }}
              >
                はい
              </button>
            </div>
          </div>
        )}
      </article>
      <Modal
        isOpen={isOpenTermsOfUseModal}
        positiveLabel="同意する"
        negativeLabel="同意しない"
        onClickConfirm={handleSend}
        onClose={() => setIsOpenTermsOfUseModal(false)}
        shouldCloseOnOverlayClick={false}
      >
        <p>
          貸し借りサポートアプリの「返してほしいチュン」の
          <Link href="/termsOfUse">
            <a className="link">利用規約</a>
          </Link>
          と
          <Link href="/privacy">
            <a className="link">プライバシーポリシー</a>
          </Link>
          に同意してほしいちゅん
        </p>
      </Modal>
    </>
  )
}

export default LendingLinkPage

type Query = {
  lendingId: string
}

export const getServerSideProps: GetServerSideProps<Props, Query> = async ({
  query,
}) => {
  if (query?.lendingId == null) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      lendingId: query?.lendingId?.toString(),
    },
  }
}
