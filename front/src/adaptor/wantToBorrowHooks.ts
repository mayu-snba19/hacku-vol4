import { useCallback } from 'react'
import useSWR from 'swr'
import { useLiffAccessToken } from '~/liff/liffHooks'
import {
  deleteWantToBorrowItem,
  fetchWantToBorrowList,
  postWantToBorrowItem,
  PostWantToBorrowListItemParams,
} from '~/repository/wantToBorrowRepository'

export const useLWantToBorrowList = () => {
  const accessToken = useLiffAccessToken()
  return useSWR(
    accessToken ? ['wantToBorrowList', accessToken] : null,
    (_, accessToken) => fetchWantToBorrowList(accessToken),
  )
}

export const usePostWantToBorrowItem = () => {
  const accessToken = useLiffAccessToken()
  const _postWantToBorrowItem = useCallback(
    async ({ content }: PostWantToBorrowListItemParams) => {
      if (accessToken == null) {
        return
      }
      return await postWantToBorrowItem(accessToken, { content })
    },
    [accessToken],
  )
  return _postWantToBorrowItem
}

export const useDeleteWantToBorrowItem = () => {
  const accessToken = useLiffAccessToken()
  const _deleteWantToBorrowItem = useCallback(
    async (wantToBorrowId: string) => {
      if (accessToken == null) {
        return
      }
      return await deleteWantToBorrowItem(accessToken, wantToBorrowId)
    },
    [accessToken],
  )
  return _deleteWantToBorrowItem
}
