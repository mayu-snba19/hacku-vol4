import { FriendWantToBorrowList, WantToBorrowItem } from '~/types/wantToBorrow'
import axios from '~/util/axios'
import checkAccessToken from '~/util/checkAccessToken'

/**
 * フレンドの借りたいものリストを取得する
 * @param accessToken アクセストークン
 */
export const fetchWantToBorrowList = async (
  accessToken: string,
): Promise<FriendWantToBorrowList[]> => {
  checkAccessToken(accessToken)
  const res = await axios.get('/want-to-borrow', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  return (
    Object.entries(res.data)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map<FriendWantToBorrowList>(([friendId, data]: [string, any]) => {
        const friendName = data.user_name
        const list: unknown[] = data.want_to_borrow_list
        return {
          friendName: friendName as string,
          friendId,
          list: list.map<WantToBorrowItem>(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (data: any) => ({
              wantToBorrowId: data.want_to_borrow_id,
              content: data.content,
              friendName: friendName,
              friendId,
            }),
          ),
        }
      })
      .flat(1)
  )
}

/**
 * 借りたいものリストを追加
 * @param accessToken アクセストークン
 * @param data データ
 */
export const postWantToBorrowItem = async (
  accessToken: string,
  data: PostWantToBorrowListItemParams,
): Promise<string> => {
  checkAccessToken(accessToken)
  const res = await axios.post('/want-to-borrow', data, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  return res.data.want_to_borrow_id.toString()
}

export type PostWantToBorrowListItemParams = {
  content: string
}

export const deleteWantToBorrowItem = async (
  accessToken: string,
  wantToBorrowId: string,
): Promise<DeleteWantToBorrowItemResponse> => {
  checkAccessToken(accessToken)
  const res = await axios.post(
    `/want-to-borrow/${encodeURIComponent(wantToBorrowId)}`,
    {},
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  )
  return { content: res.data.content }
}

export type DeleteWantToBorrowItemResponse = {
  content: string
}
