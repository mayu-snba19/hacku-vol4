import { useCallback, useState } from 'react'
import { useLiffAccessToken } from '~/liff/liffHooks'
import { addFriend, AddFriendParams } from '~/repository/friendRepository'

export const useAddFriend = () => {
  const [friendName, setFriendName] = useState<string | null>(null)
  const accessToken = useLiffAccessToken()
  const _addFriend = useCallback(
    async ({ friendId }: AddFriendParams) => {
      if (accessToken == null) {
        return
      }
      const res = await addFriend(accessToken, { friendId })
      setFriendName(res.friendName)
    },
    [accessToken],
  )
  return { addFriend: _addFriend, friendName }
}
