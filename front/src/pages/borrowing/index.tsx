import React from 'react'
import BottomBar from '~/components/BottomBar'
import LendingItemBox from '~/components/LendingItemBox'
import Meta from '~/components/Meta'

const BorrowingPage = () => {
  // TODO: 仮データ
  const { data: borrowingList } = {
    data: [
      {
        lendingId: '0001',
        content: '微積のノート',
        deadline: new Date(2021, 2, 6),
        ownerName: '山田太郎',
        kind: 'borrowing' as const,
      },
      {
        lendingId: '0002',
        content: 'マンガ',
        deadline: new Date(2021, 3, 1),
        ownerName: '田中次郎',
        kind: 'borrowing' as const,
      },
    ],
  }

  return (
    <>
      <Meta title="借りているもの一覧" />
      <div>
        {borrowingList?.map((borrowingInfo) => (
          <LendingItemBox
            key={borrowingInfo.lendingId}
            item={borrowingInfo}
            onClick={() => {
              console.log('CLICK')
            }}
          />
        ))}
      </div>
      <BottomBar type="borrowing" />
    </>
  )
}

export default BorrowingPage
