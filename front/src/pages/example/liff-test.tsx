import React from 'react'
import {
  useLiff,
  useLiffAccessToken,
  useLiffAuth,
  useLiffContext,
} from '~/liff/liffHooks'

const LiffTest = () => {
  const { liff } = useLiff()
  const { user } = useLiffAuth()
  const accessToken = useLiffAccessToken()
  const context = useLiffContext()

  const handleSendMessage = () => {
    liff?.shareTargetPicker([
      {
        type: 'text',
        text: 'Hello, World!',
      },
    ])
  }

  return (
    <div className="m-8">
      <section>
        <h1 className="text-2xl mt-12 mb-4">プロフィール</h1>
        <p>ユーザー名: {user?.displayName}</p>
        <p>ユーザーID: {user?.userId}</p>
        <p>ステータスメッセージ: {user?.statusMessage}</p>
        {user != null && (
          <img
            src={user.pictureUrl}
            width="100px"
            height="100px"
            alt="ユーザーアイコン"
          />
        )}
      </section>
      <section>
        <h1 className="text-2xl mt-12 mb-4">アクセストークン</h1>
        <p>{accessToken}</p>
      </section>
      <section>
        <h1 className="text-2xl mt-12 mb-4">実行環境</h1>
        <p>
          LIFFブラウザで開いているか？:{' '}
          {context.isLiffBrowser ? 'はい' : 'いいえ'}
        </p>
        <p>リンクをどこで開いたか？: {context.type}</p>
      </section>
      <section>
        <h1 className="text-2xl mt-12 mb-4">シェアターゲットピッカーテスト</h1>
        <button onClick={handleSendMessage}>メッセージを送る</button>
      </section>
    </div>
  )
}

export default LiffTest
