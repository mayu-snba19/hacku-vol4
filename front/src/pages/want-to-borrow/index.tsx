import React from 'react'
import BottomBar from '~/components/BottomBar'
import Meta from '~/components/Meta'

// 優先順 低
const BorrowingPage: React.FC = () => {
  return (
    <>
      <Meta title="借りたいものリスト" />
      <div>借りたいもの一覧ページ</div>
      <BottomBar type="want-to-borrow" />
    </>
  )
}

export default BorrowingPage
