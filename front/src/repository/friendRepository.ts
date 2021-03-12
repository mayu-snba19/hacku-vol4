import axios from '~/util/axios'
import checkAccessToken from '~/util/checkAccessToken'

export const addFriend = async (
  accessToken: string,
  { friendId }: AddFriendParams,
): Promise<AddFriendResponse> => {
  checkAccessToken(accessToken)
  const res = await axios.post(
    '/friend',
    {
      friend_id: friendId,
    },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  )
  return {
    userName: res.data.user_name,
    friendName: res.data.friend_name,
  }
}

export type AddFriendParams = {
  friendId: string
}

export type AddFriendResponse = {
  userName: string
  friendName: string
}
