import { useCallback } from 'react'
import useSWR from 'swr'
import { useLiffAccessToken } from '~/liff/liffHooks'
import {
  fetchBorrowingList,
  fetchLendingList,
  linkLendingInfo,
  postHaveReturned,
  postLendingInfo,
} from '~/repository/lendingInfoRepository'
import type { PostLendingInfoParams } from '~/repository/lendingInfoRepository'

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

export const usePostLendingInfo = () => {
  const accessToken = useLiffAccessToken()
  const _postLendingInfo = useCallback(
    async ({ content, deadline }: PostLendingInfoParams) => {
      if (accessToken == null) {
        return
      }
      return await postLendingInfo(accessToken, { content, deadline })
    },
    [accessToken],
  )
  return _postLendingInfo
}

export const usePostHaveReturned = () => {
  const accessToken = useLiffAccessToken()
  const _postHaveReturned = useCallback(
    async (lendingId: string) => {
      if (accessToken == null) {
        return
      }
      return await postHaveReturned({ accessToken, lendingId })
    },
    [accessToken],
  )
  return _postHaveReturned
}

export const useLinkLendingInfo = () => {
  const accessToken = useLiffAccessToken()
  const _linkLendingInfo = useCallback(
    async (lendingId: string) => {
      if (accessToken == null) {
        return
      }
      return await linkLendingInfo(accessToken, { lendingId })
    },
    [accessToken],
  )
  return _linkLendingInfo
}
