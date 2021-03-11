import React from 'react'
import LendingItemBox from '~/components/LendingItemBox'

const ComponentsBook = () => {
  if (process.env.NODE_ENV !== 'development') {
    return <div>ページが見つかりません</div>
  }

  return (
    <div>
      <h1>コンポーネントを確認できるページ</h1>
      <section>
        <h2>「貸している」アイテム</h2>
        <LendingItemBox
          item={{
            lendingId: '0001',
            content: '微積のノート',
            deadline: new Date(2021, 2, 6),
            borrowerName: '山田太郎',
            kind: 'lending',
            status: 'concluded',
          }}
        />
        <LendingItemBox
          item={{
            lendingId: '0002',
            content: 'マンガ',
            deadline: new Date(2021, 3, 1),
            borrowerName: '田中次郎',
            kind: 'lending',
            status: 'concluded',
          }}
        />
      </section>
      <section>
        <h2>「借りている」アイテム</h2>
        <LendingItemBox
          item={{
            lendingId: '0001',
            content: '微積のノート',
            deadline: new Date(2021, 2, 8),
            ownerName: '山田太郎',
            kind: 'borrowing',
          }}
        />
        <LendingItemBox
          item={{
            lendingId: '0002',
            content: 'マンガ',
            deadline: new Date(2021, 3, 1),
            ownerName: '田中次郎',
            kind: 'borrowing',
          }}
        />
      </section>
    </div>
  )
}

export default ComponentsBook
