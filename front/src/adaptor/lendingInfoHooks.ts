import useSWR from 'swr'
import { useLiffAccessToken } from '~/liff/liffHooks'
import {
  fetchBorrowingList,
  fetchLendingList,
} from '~/repository/lendingInfoRepository'

/**
 * 貸しているもの一覧情報を取得するSWR hooks
 *
 * @example
 * const SomeComponent: React.FC = () => {
 *  const { data: lendingList, error, isValidating } = useLendingInfo()
 *
 *  if(isValidating) return <div>ロード中</div>
 *  if(error) return <div>エラーが発生しました</div>
 *
 *  return (
 *    <div>
 *      {lendingList.map(info => <p>{info.content}</p>)}
 *    </div>
 *  )
 * }
 *
 */
export const useLendingInfo = () => {
  const accessToken = useLiffAccessToken()
  return useSWR(
    accessToken ? ['lendingInfo', accessToken] : null,
    (_, accessToken) => fetchLendingList(accessToken),
  )
}

/**
 * 借りているもの一覧情報を取得するSWR hooks
 *
 * @example
 * const SomeComponent: React.FC = () => {
 *  const { data: lendingList, error, isValidating } = useBorrowingInfo()
 *
 *  if(isValidating) return <div>ロード中</div>
 *  if(error) return <div>エラーが発生しました</div>
 *
 *  return (
 *    <div>
 *      {lendingList.map(info => <p>{info.content}</p>)}
 *    </div>
 *  )
 * }
 */
export const useBorrowingInfo = () => {
  const accessToken = useLiffAccessToken()
  return useSWR(
    accessToken ? ['borrowingInfo', accessToken] : null,
    (_, accessToken) => fetchBorrowingList(accessToken),
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useLendingAndBorrowingInfo = () => {
  // TODO: not implemented
  throw new Error()
}
