import liff from '@line/liff'
import { createContext, useContext, useEffect, useState } from 'react'

const LIFF_ID = process.env.LIFF_ID ?? ''

export type LIFF = typeof liff
type LiffState =
  // LIFFの初期化が正常に終了
  | {
      liff: LIFF
      isLoading: false
      error: null
    }
  // LIFFの初期化中
  | {
      liff: null
      isLoading: true
      error: null
    }
  // LIFFの初期化に失敗
  | {
      liff: null
      isLoading: false
      // eslint-disable-next-line @typescript-eslint/ban-types
      error: {} // null以外の任意の値
    }

const LiffContext = createContext<LiffState>({
  liff: null,
  isLoading: true,
  error: null,
})

/**
 * LIFFの初期化とliffオブジェクトの配信を行う
 */
export const LiffProvider: React.FC = ({ ...props }) => {
  const [_liff, setLiff] = useState<LiffState>({
    liff: null,
    isLoading: true,
    error: null,
  })
  useEffect(() => {
    if (process.browser) {
      const init = async () => {
        try {
          const { default: liff } = await import('@line/liff')
          await liff.init({ liffId: LIFF_ID })
          if (!liff.isLoggedIn()) {
            // ログインしていなければ最初にログインする
            liff.login({
              // TODO: LINEのソーシャルログイン後、元のページに戻ってきて欲しい
              redirectUri: window.location.href,
            }) // ログインしていなければ最初にログインする
          } else {
            // LIFFが動いているのであれば
            setLiff({ liff, isLoading: false, error: null })
          }
        } catch (error) {
          console.error('LIFFの初期化に失敗しました')
          console.error(error)
          setLiff({ liff: null, isLoading: false, error })
        }
      }
      init()
    }
  }, [])

  return <LiffContext.Provider value={_liff} {...props} />
}

/**
 * LIFF SDKを使うためのhooks
 *
 * ※ローディング中及びエラー発生時はliffがnullになる
 *
 * @return `{ liff, isLoading, error }`
 */
const useLiff = () => useContext(LiffContext)
export default useLiff

/**
 * アクセストークンを取得するhooks
 * よく使いそうなので個別で用意しておく
 */
export const useLiffAccessToken = () =>
  useContext(LiffContext).liff?.getAccessToken() ?? null
