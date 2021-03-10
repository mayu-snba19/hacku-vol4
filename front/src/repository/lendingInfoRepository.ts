import axios from '~/util/axios'
import { BorrowingInfo, LendingInfo } from '~/types/lendingInfo'
import LendingToken from '~/types/lendingToken'

/**
 * アクセストークンの有無をチェックする
 * @param accessToken アクセストークン
 */
const checkAccessToken = (accessToken: string) => {
  if (accessToken == null || accessToken === '') {
    throw new Error('アクセストークンが指定されていません')
  }
}

/**
 * 貸す物を登録する
 * @params accessToken
 * @params data 登録するデータ
 * @return token: 貸出トークン
 */
export const postLendingInfo = async (
  accessToken: string,
  data: PostLendingInfoParams,
): Promise<LendingToken> => {
  checkAccessToken(accessToken)
  const res = await axios.post('/lending', data, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  return res.data.lending_id.toString()
}

export type PostLendingInfoParams = {
  content: string
  deadline: Date
}

/**
 * 貸し出し情報と借りる人を紐付ける
 */

export const linkLendingInfo = async (
  accessToken: string,
  data: PostLinkInfoParams,
): Promise<LendingInfo> => {
  checkAccessToken(accessToken)
  const res = await axios.put(
    `/lending/${encodeURIComponent(data.lendingId)}`,
    data,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  )
  return {
    lendingId: `${res.data.lending_id}`,
    content: res.data.content as string,
    deadline: new Date(res.data.deadline as string),
    borrowerName: res.data.borrower_name as string,
    kind: 'lending',
  } as LendingInfo
}

export type PostLinkInfoParams = {
  lendingId: string
}

/**
 * 返却を登録する
 *
 * @params accessToken
 * @params lendingId 貸出ID
 * @return 貸出情報
 */
export const postHaveReturned = async ({
  accessToken,
  lendingId,
}: PostHaveReturnedParams): Promise<LendingInfo> => {
  checkAccessToken(accessToken)
  const res = await axios.delete(`/lending/${lendingId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  return {
    lendingId: `${res.data.lending_id}`,
    content: res.data.content as string,
    deadline: new Date(res.data.deadline as string),
    borrowerName: res.data.borrower_name as string,
    kind: 'lending',
  } as LendingInfo
}

export type PostHaveReturnedParams = {
  accessToken: string
  lendingId: string
}

/**
 * 貸しているもの一覧を取得する
 *
 * @params {string} accessToken
 * @return 貸しているもの一覧
 */
export const fetchLendingList = async (
  accessToken: string,
): Promise<LendingInfo[]> => {
  checkAccessToken(accessToken)
  const res = await axios.get('/owner/lending', {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: {
      accessToken,
    },
  })
  const lendingList: Record<string, unknown>[] = res.data.lending_list
  return lendingList.map<LendingInfo>((data) => ({
    lendingId: `${data.lending_id}`,
    content: data.content as string,
    deadline: new Date(data.deadline as string),
    borrowerName: data.borrower_name as string,
    kind: 'lending',
  })) as LendingInfo[]
}

/**
 * 借りているもの一覧を取得する
 *
 * @params {string} accessToken
 * @return 借りているもの一覧
 */
export const fetchBorrowingList = async (
  accessToken: string,
): Promise<BorrowingInfo[]> => {
  checkAccessToken(accessToken)
  const res = await axios.get('/borrower/lending', {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: {
      accessToken,
    },
  })
  const borrowingList: Record<string, unknown>[] = res.data.lending_list
  return borrowingList.map((data) => ({
    lendingId: `${data.lending_id}`,
    content: data.content as string,
    deadline: new Date(data.deadline as string),
    ownerName: data.owner_name as string,
    kind: 'borrowing',
  })) as BorrowingInfo[]
}

/**
 * 貸しているもの、借りているものの一覧を合わせて取得する
 *
 * @param {string} accessToken
 * @return 借りているもの、貸しているもの一覧
 */
export const fetchLendingAndBorrowingList = async (
  accessToken: string,
): Promise<(LendingInfo | BorrowingInfo)[]> => {
  const [lendingList, borrowingList] = await Promise.all([
    fetchLendingList(accessToken),
    fetchBorrowingList(accessToken),
  ])
  return [...lendingList, ...borrowingList]
}
