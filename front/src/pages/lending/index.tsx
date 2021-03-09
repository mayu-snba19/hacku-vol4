import React, { useState } from 'react'
// import { useLendingInfo } from '~/adaptor/lendingInfoHooks'
import BottomBar from '~/components/BottomBar'
import LendingItemBox from '~/components/LendingItemBox'
import Meta from '~/components/Meta'
import Modal from '~/components/Modal'

const LendingListPage: React.FC = () => {
  const [selectedLendingId, setSelectedLendingId] = useState<string | null>()

  // TODO: 仮データ
  const { data: lendingList } = {
    data: [
      {
        lendingId: '0001',
        content: '微積のノート',
        deadline: new Date(2021, 2, 6),
        borrowerName: '山田太郎',
        kind: 'lending' as const,
      },
      {
        lendingId: '0002',
        content: 'マンガ',
        deadline: new Date(2021, 3, 1),
        borrowerName: '田中次郎',
        kind: 'lending' as const,
      },
      {
        lendingId: '0003',
        content: '微積のノート',
        deadline: new Date(2021, 2, 6),
        ownerName: '山田太郎',
        kind: 'borrowing' as const,
      },
      {
        lendingId: '0004',
        content: 'マンガ',
        deadline: new Date(2021, 3, 1),
        ownerName: '田中次郎',
        kind: 'borrowing' as const,
      },
    ],
  }

  const selectedLendingInfo =
    selectedLendingId == null
      ? null
      : lendingList.find((item) => item.lendingId === selectedLendingId)

  const handleReturn = () => {
    console.log('返却処理')
  }

  return (
    <>
      <Meta title="貸しているもの一覧" />
      <article>
        <h2 className="mt-8 mb-6 text-center">貸し借り中のもの</h2>
        {lendingList?.map((lendingInfo) => (
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
        positiveLabel="返却された"
        negativeLabel="まだ"
        onClickConfirm={handleReturn}
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
    </>
  )
}

export default LendingListPage
