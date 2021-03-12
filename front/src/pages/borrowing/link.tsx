import React, { useEffect, useState } from 'react'
import c from 'classnames'
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
  const [animationPhase, setAnimationPhase] = useState<0 | 1>(0)

  const [isOpenTermsOfUseModal, setIsOpenTermsOfUseModal] = useState(
    router.query.modal === 'open',
  )

  useEffect(() => {
    if (accessToken != null) {
      handleLinkLending()
    }
  }, [accessToken])

  const handleOpenDialog = () => {
    if (isFirst) {
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, modal: 'open' },
        },
        undefined,
        { shallow: true },
      )
      setIsOpenTermsOfUseModal(true)
    } else {
      handleSend()
    }
  }

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
    router.replace(url, '/lending', {})
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
              ボクの名前はすずめだチュン。
            </p>
            {animationPhase === 0 && (
              <div className="w-full flex justify-end px-16 mt-8">
                <button
                  className="w-8 h-8 relative"
                  onClick={() => setAnimationPhase(1)}
                >
                  <span className="flex h-8 w-8">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-8 w-8 bg-purple-500 opacity-50"></span>
                  </span>
                </button>
              </div>
            )}
            <p
              className={c(
                'mt-8 text-center transition',
                1 <= animationPhase ? 'opacity-100' : 'opacity-0',
              )}
            >
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
            <div
              className={c(
                'text-center transform',
                1 <= animationPhase ? 'opacity-100' : 'opacity-0',
              )}
            >
              <button className="bg-gray-100 text-gray-500 px-4 py-2 my-4 rounded-md mr-8">
                いいえ
              </button>
              {/* NOTE: 今後の拡張のためにbuttonで実装 */}
              <button
                className="bg-brand-400 text-text px-8 py-2 my-4 rounded-md"
                onClick={handleOpenDialog}
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
