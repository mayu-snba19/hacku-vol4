import liff from '@line/liff'
import { createContext, useContext, useEffect, useState } from 'react'

export type LIFF = typeof liff
export type LiffState =
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
const LiffProvider: React.FC = ({ ...props }) => {
  const [_liff, setLiff] = useState<LiffState>({
    liff: null,
    isLoading: true,
    error: null,
  })
  useEffect(() => {
    if (process.browser) {
      const LIFF_ID = process.env.NEXT_PUBLIC_LIFF_ID ?? ''
      const init = async () => {
        try {
          const { default: liff } = await import('@line/liff')
          await liff.init({ liffId: LIFF_ID })
          if (!liff.isLoggedIn()) {
            // ログインしていなければ最初にログインする
            liff.login({
              redirectUri: window.location.href,
            })
          } else {
            // LIFFが動いているのであれば
            setLiff({ liff, isLoading: false, error: null })
            console.log('[LIFF] 初期化に成功しました')
          }
        } catch (error) {
          console.error('[LIFF] 初期化に失敗しました')
          console.error(error)
          setLiff({ liff: null, isLoading: false, error })
        }
      }
      init()
    }
  }, [])

  return <LiffContext.Provider value={_liff} {...props} />
}

export default LiffProvider

/**
 * LIFF SDKを使うためのhooks
 *
 * ※ローディング中及びエラー発生時はliffがnullになる
 *
 * @return `{ liff, isLoading, error }`
 *
 * @example
 * const Component = () => {
 *    const liff = useLiff()
 *    const context = liff?.getContext()
 *    return (
 *      <div>
 *        <h1>テスト</h1>
 *        {context != null && <div>LIFFアプリが起動された画面は{context.type}です</div>}
 *      </div>
 *    )
 * }
 */
export const useLiff = () => useContext(LiffContext)
