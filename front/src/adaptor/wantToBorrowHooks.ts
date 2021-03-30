import { useCallback } from 'react'
import useSWR from 'swr'
import { useLiffAccessToken } from '~/liff/liffHooks'
import {
  deleteWantToBorrowItem,
  fetchFriendsWantToBorrowList,
  fetchWantToBorrowList,
  postWantToBorrowItem,
  PostWantToBorrowListItemParams,
} from '~/repository/wantToBorrowRepository'

export const useWantToBorrowList = () => {
  const accessToken = useLiffAccessToken()
  return useSWR(
    accessToken ? ['wantToBorrowList', accessToken] : null,
    (_, accessToken) => fetchWantToBorrowList(accessToken),
  )
}

export const useFriendsWantToBorrowList = () => {
  const accessToken = useLiffAccessToken()
  return useSWR(
    accessToken ? ['friendsWantToBorrowList', accessToken] : null,
    (_, accessToken) => fetchFriendsWantToBorrowList(accessToken),
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
