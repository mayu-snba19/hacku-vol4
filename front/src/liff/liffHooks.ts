import { useState, useEffect, useCallback } from 'react'
import User from '~/types/user'

import { useLiff } from './LiffProvider'

export { useLiff }

/**
 * 認証状態とユーザー情報を取得するhooks
 *
 * @return `{ user: ユーザー情報, logout: ログアウト関数 }`
 *
 * @example
 * const SomeComponent: React.FC = () => {
 *  const { user } = useLiffAuth()
 *
 *  return (
 *    <div>
 *      {user == null ? <p>未ログインです</p> : <p>ユーザー名: {user.displayName}</p>}
 *    </div>
 *  )
 * }
 */
export const useLiffAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const { liff } = useLiff()

  useEffect(() => {
    if (liff != null) {
      // liffが初期化済みの場合プロフィールを取得する
      liff.getProfile().then((profile) => {
        setUser({
          userId: profile.userId,
          displayName: profile.displayName,
          pictureUrl: profile.pictureUrl,
          statusMessage: profile.statusMessage,
        })
        console.log('[LIFF] ユーザー情報を取得しました')
      })
    }
  }, [liff])

  const logout = useCallback(() => {
    if (liff == null) {
      console.warn('[LIFF] 初期が終わる前にログアウトはできません')
      return
    } else if (user == null) {
      console.warn('[LIFF] ユーザーはログインしていません')
      return
    }
    liff?.logout()
    setUser(null)
    console.log('[LIFF] ログアウトが完了しました')
  }, [liff])

  return { user, logout }
}

/**
 * アクセストークンを取得するhooks
 * よく使いそうなので個別で用意しておく
 *
 * @example
 * const SomeComponent: React.FC = () => {
 *  const accessToken = useAccessToken()
 *
 *  return (
 *    <div>
 *      <button onClick={() => fetchAPI(accessToken)}>APIを叩く</button>
 *    </div>
 *  )
 * }
 */
export const useLiffAccessToken = () => useLiff().liff?.getAccessToken() ?? null

/**
 * LIFFの実行環境を表す型
 */
type LiffContext =
  | {
      type: 'utou' | 'room' | 'group'
      isLiffBrowser: true
      talkId: string | null
    }
  | {
      type: 'none' | 'squareChat' | 'external' | null
      isLiffBrowser: false
    }

/**
 * LIFFの実行環境を取得する（https://developers.line.biz/ja/reference/liff/#get-context）
 *
 * `getContext`をラップしたhooks
 *
 * @return `{ type, isLiffBrowser, talkId }`
 *
 * - type           LIFFがどの場所から開かれたか
 * - isLiffBrowser  LIFFがLIFFブラウザで開かれたか
 * - talkId?        typeに応じて1対1トークID、グループID、トークルームID、nullのいずれかが入る
 */
export const useLiffContext = (): LiffContext => {
  const context = useLiff().liff?.getContext()
  const type = context?.type
  if (type === 'utou' || type === 'room' || type === 'group') {
    return {
      type,
      isLiffBrowser: true,
      talkId:
        type === 'utou'
          ? context?.utouId ?? null
          : type === 'room'
          ? context?.roomId ?? null
          : context?.groupId ?? null,
    }
  } else {
    return {
      type: type ?? null,
      isLiffBrowser: false,
    }
  }
}
