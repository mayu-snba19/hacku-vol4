import React from 'react'
import type { GetServerSideProps } from 'next'

type Props = {
  lendingId: string
}

const LendingLinkPage: React.FC<Props> = ({ lendingId }) => {
  return <div>{lendingId}</div>
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
