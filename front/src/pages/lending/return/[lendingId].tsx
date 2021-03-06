import { GetServerSideProps } from 'next'
import React from 'react'
import Meta from '~/components/Meta'

type Props = {
  lendingId: string
}

const ReturnPage: React.FC<Props> = ({ lendingId }) => {
  // このページはモーダルで作ってもいいかも（その場合はこのファイルは消してしまって大丈夫です）
  return (
    <>
      <Meta title="返却登録" />
      <div>返却登録ページ 貸出ID: {lendingId}</div>
    </>
  )
}

export default ReturnPage

type Query = {
  lendingId: string
}

export const getServerSideProps: GetServerSideProps<Props, Query> = async ({
  params,
}) => {
  if (params?.lendingId == null) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      lendingId: params.lendingId,
    },
  }
}
