import { useCallback, useEffect, useState } from 'react'
import useSWR from 'swr'
import { useLiffAccessToken } from '~/liff/liffHooks'
import {
  fetchBorrowingList,
  fetchLendingList,
  getBorrowingInfoFromToken,
  GetBorrowingInfoFromTokenResponse,
  LendingTokenNotFoundError,
  linkAsBorrower,
  linkLendingInfo,
  postHaveReturned,
  postLendingInfo,
  putLendingProcessFinished,
} from '~/repository/lendingInfoRepository'
import type { PostLendingInfoParams } from '~/repository/lendingInfoRepository'
import LendingToken from '~/types/lendingToken'

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

export const usePutLendingProcessFinished = () => {
  const accessToken = useLiffAccessToken()
  const _putLendingProcessFinished = useCallback(
    async (lendingId: LendingToken) => {
      if (accessToken == null) {
        return
      }
      return await putLendingProcessFinished(accessToken, lendingId)
    },
    [accessToken],
  )
  return _putLendingProcessFinished
}

export const useGetBorrowingInfoFromToken = (lendingToken: LendingToken) => {
  const [data, setData] = useState<GetBorrowingInfoFromTokenResponse | null>(
    null,
  )
  const [notFoundError, setNotFoundError] = useState<
    'notfound' | 'unknown' | null
  >(null)
  const [isLoading, setIsLoading] = useState(true)
  const accessToken = useLiffAccessToken()
  useEffect(() => {
    if (accessToken != null) {
      const func = async () => {
        try {
          const borrowingInfo = await getBorrowingInfoFromToken(
            accessToken,
            lendingToken,
          )
          setData(borrowingInfo)
          setNotFoundError(null)
        } catch (e) {
          if (e instanceof LendingTokenNotFoundError) {
            setNotFoundError('notfound')
          } else {
            setNotFoundError('unknown')
          }
        } finally {
          setIsLoading(false)
        }
      }
      func()
    }
  }, [accessToken])

  return { data, errorCode: notFoundError, isLoading }
}

export const useLinkAsBorrower = () => {
  const accessToken = useLiffAccessToken()
  const _linkAsBorrower = useCallback(
    async (lendingToken: LendingToken) => {
      if (accessToken == null) {
        return
      }
      return await linkAsBorrower(accessToken, lendingToken)
    },
    [accessToken],
  )
  return _linkAsBorrower
}
