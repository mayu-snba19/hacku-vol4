import axios from '~/util/axios'
import { BorrowingInfo, LendingInfo } from '~/types/lendingInfo'
import LendingToken from '~/types/lendingToken'

const checkAccessToken = (accessToken: string) => {
  if (accessToken == null || accessToken === '') {
    throw new Error('アクセストークンが指定されていません')
  }
}

/**
 * 貸す物を登録する
 * @params params
 * @return token: 貸出トークン
 */
export const postLendingInfo = async (
  params: PostLendingInfoParams,
): Promise<LendingToken> => {
  checkAccessToken(params.accessToken)
  const res = await axios.post('/lending', params)
  return res.data.id.toString()
}

export type PostLendingInfoParams = {
  accessToken: string
  content: string
  deadline: Date
}

/**
 * 返却を登録する
 */
export const postHaveReturned = async ({
  accessToken,
  lendingId,
}: PostHaveReturnedParams): Promise<void> => {
  checkAccessToken(accessToken)
  await axios.delete(`/lending/${lendingId}`)
}

export type PostHaveReturnedParams = {
  accessToken: string
  lendingId: string
}

/**
 * 貸しているもの一覧を取得する
 *
 * @return 貸しているもの一覧
 */
export const fetchLendingList = async ({
  accessToken,
}: FetchLendingListParams): Promise<LendingInfo[]> => {
  const res = await axios.get('/owner/lending', {
    params: {
      accessToken,
    },
  })
  checkAccessToken(accessToken)
  return res.data.map((data: Record<string, unknown>) => ({
    ...data,
    kind: 'lending',
  })) as LendingInfo[]
}

export type FetchLendingListParams = {
  accessToken: string
}

/**
 * 借りているもの一覧を取得する
 *
 * @return 借りているもの一覧
 */
export const fetchBorrowingList = async ({
  accessToken,
}: FetchBorrowingListParams): Promise<BorrowingInfo[]> => {
  const res = await axios.get('/borrower/lending', {
    params: {
      accessToken,
    },
  })
  checkAccessToken(accessToken)
  return res.data.map((data: Record<string, unknown>) => ({
    ...data,
    kind: 'borrowing',
  })) as BorrowingInfo[]
}

export type FetchBorrowingListParams = {
  accessToken: string
}

/**
 * 貸しているもの、借りているものの一覧を合わせて取得する
 *
 * @return 借りているもの、貸しているもの一覧
 */
export const fetchLendingAndBorrowingList = async ({
  accessToken,
}: FetchLendingAndBorrowingList): Promise<(LendingInfo | BorrowingInfo)[]> => {
  const [lendingList, borrowingList] = await Promise.all([
    fetchLendingList({ accessToken }),
    fetchBorrowingList({ accessToken }),
  ])
  return [...lendingList, ...borrowingList].sort((a, b) =>
    a.createdAt > b.createdAt ? 1 : a.createdAt < b.createdAt ? -1 : 0,
  )
}

export type FetchLendingAndBorrowingList = {
  accessToken: string
}
