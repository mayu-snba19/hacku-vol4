import type { GetServerSideProps } from 'next'
import React, { useState, useEffect } from 'react'
import {
  useBorrowingInfo,
  useLendingInfo,
  usePostHaveReturned,
} from '~/adaptor/lendingInfoHooks'
import BottomBar from '~/components/BottomBar'
import LendingItemBox from '~/components/LendingItemBox'
import Meta from '~/components/Meta'
import Modal from '~/components/Modal'

type Props = {
  currentlyCreatedlendingId: string | null
  isFirstVisit: boolean | null
}

const LendingListPage: React.FC<Props> = ({
  currentlyCreatedlendingId,
  // isFirstVisit,
}) => {
  const [selectedLendingId, setSelectedLendingId] = useState<string | null>()

  const { data: lendingList } = useLendingInfo()
  const { data: borrowingList } = useBorrowingInfo()
  const postHaveReturned = usePostHaveReturned()

  const [isOpenFirstModal, setIsOpenFirstModal] = useState(false)
  useEffect(() => {
    if (currentlyCreatedlendingId != null) {
      const timer = setTimeout(() => setIsOpenFirstModal(true), 300)
      return () => clearTimeout(timer)
    }
  }, [])

  // TODO: 仮データ
  // const { data: lendingList } = {
  //   data: [
  //     {
  //       lendingId: '0001',
  //       content: '微積のノート',
  //       deadline: new Date(2021, 2, 6),
  //       borrowerName: '山田太郎',
  //       kind: 'lending' as const,
  //     },
  //     {
  //       lendingId: '0002',
  //       content: '微分積分学続論の第10回の授業ノート',
  //       deadline: new Date(2021, 3, 1),
  //       borrowerName: '田中次郎',
  //       kind: 'lending' as const,
  //     },
  //     {
  //       lendingId: '0003',
  //       content: '微積のノート',
  //       deadline: new Date(2021, 2, 6),
  //       ownerName: '山田太郎',
  //       kind: 'borrowing' as const,
  //     },
  //     {
  //       lendingId: '0004',
  //       content: 'マンガ',
  //       deadline: new Date(2021, 3, 1),
  //       ownerName: '田中次郎',
  //       kind: 'borrowing' as const,
  //     },
  //   ],
  // }

  const selectedLendingInfo =
    lendingList == null
      ? null
      : lendingList.find((item) => item.lendingId === selectedLendingId)

  const handleReturn = async (lendingId: string | null) => {
    if (lendingId == null) {
      return
    }
    await postHaveReturned(lendingId)
  }

  const list = [...(borrowingList ?? []), ...(lendingList ?? [])].sort((a, b) =>
    a.deadline > b.deadline ? 1 : a.deadline < b.deadline ? -1 : 0,
  )

  return (
    <>
      <Meta title="貸しているもの一覧" />
      <article className="min-h-screen">
        <h2 className="mt-8 mb-6 text-center">貸し借り中のもの</h2>
        {list.map((lendingInfo) => (
          <LendingItemBox
            key={lendingInfo.lendingId}
            item={lendingInfo}
            onClick={() => {
              setSelectedLendingId(lendingInfo.lendingId)
              console.log('クリックされた')
            }}
          />
        ))}
      </article>
      <BottomBar type="lending" />
      <Modal
        isOpen={selectedLendingInfo != null}
        positiveLabel={
          selectedLendingInfo?.kind === 'lending' ? '返却された' : 'とじる'
        }
        negativeLabel={
          selectedLendingInfo?.kind === 'lending' ? 'まだ' : undefined
        }
        onClickConfirm={() => handleReturn(selectedLendingId ?? null)}
        onClose={() => setSelectedLendingId(null)}
      >
        <p>
          {selectedLendingInfo?.borrowerName} さんに貸していた{' '}
          <span className="inline-block underline ">
            「{selectedLendingInfo?.content}」
          </span>
          は返却されたちゅんか？
        </p>
      </Modal>
      <Modal
        isOpen={isOpenFirstModal}
        positiveLabel="わかった"
        onClickConfirm={() => setIsOpenFirstModal(false)}
        onClose={() => setIsOpenFirstModal(false)}
        shouldCloseOnOverlayClick={false}
      >
        <p>
          {'マンガ'}
          の貸し借りを登録したちゅん！この画面から返却期限を確認できるちゅん
        </p>
      </Modal>
    </>
  )
}

export default LendingListPage

type Query = {
  lendingId?: string
  first?: string
}

export const getServerSideProps: GetServerSideProps<Props, Query> = async ({
  query,
}) => {
  return {
    props: {
      currentlyCreatedlendingId: query?.lendingId?.toString() ?? null,
      isFirstVisit: query?.first === 'true',
    },
  }
}
