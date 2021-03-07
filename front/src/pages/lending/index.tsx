import React from 'react'
// import { useLendingInfo } from '~/adaptor/lendingInfoHooks'
import BottomBar from '~/components/BottomBar'
import LendingItemBox from '~/components/LendingItemBox'
import Meta from '~/components/Meta'

const LendingListPage: React.FC = () => {
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
    ],
  }

  const handleReturn = (id: string) => {
    console.log(`RETURN: ${id}`)
  }

  return (
    <>
      <Meta title="貸しているもの一覧" />
      {/* 貸出一覧ページ（借りているもの一覧ページもここに一緒に表示していいと思います） */}
      <div>
        {lendingList?.map((lendingInfo) => (
          <LendingItemBox
            key={lendingInfo.lendingId}
            item={lendingInfo}
            onClick={() => handleReturn(lendingInfo.lendingId)}
          />
        ))}
      </div>
      <BottomBar type="lending" />
    </>
  )
}

export default LendingListPage
