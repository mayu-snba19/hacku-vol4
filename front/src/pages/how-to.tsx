import React from 'react'
import Meta from '~/components/Meta'
import styles from '~/styles/HowTo.module.css'

const HowTo = () => {
  const LINE_BOT_URL = process.env.NEXT_PUBLIC_LINE_BOT_URL
  return (
    <>
      <Meta title="使い方" />
      <article className={styles.h}>
        <h2 className={styles.title}>返して欲しいでチュン</h2>
        <div
          style={{
            backgroundColor: '#699bac',
            letterSpacing: 0.102 + 'em',
            margin: 0,
            padding: 0,
          }}
        >
          <div className={styles.description}>
            <p>アプリのインストール不要！</p>
            <p>LINEで簡単貸し借り管理</p>
          </div>
          <section>
            <h2 className={styles.secondTitle}>貸す</h2>
            <div className={styles.lender}>
              <div className={styles.procedure}>
                <h3>１. LINE botを追加</h3>
                <p>
                  下のボタンから「返して欲しいでチュン」を友達追加してください！
                </p>
              </div>
              <a href="https://lin.ee/KvjNz6j">
                <img src="/line-button.png" width="200px" />
              </a>
              <div className={styles.procedure}>
                <h3>２. 貸し借りを登録</h3>
                <p>LINE botのメニュー画面から新規登録ボタンを押します。</p>
                <p>LINEの友達一覧から貸した人を選んで登録完了！</p>
              </div>
              <div className={styles.img}>
                <img src="/line-create.PNG" width="100%" />
              </div>
              <div className={styles.procedure}>
                <h3>３. 通知が来る</h3>
                <p>設定した期限が過ぎたら確認メッセージが届きます。</p>
                <p>返してもらったらここから通知を解除してね！</p>
                <div className={styles.img}>
                  <img src="/line-return.PNG" width="100%" />
                </div>
              </div>
            </div>
          </section>
          <div style={{ height: 20 + 'px' }}></div>
          <section>
            <h2 className={styles.secondTitle}>借りる</h2>
            <div className={styles.lender}>
              <div className={styles.procedure}>
                <h3>１. LINE botを追加</h3>
                <p>
                  下のボタンから「返して欲しいでチュン」を友達追加してください！
                </p>
              </div>
              <a href={LINE_BOT_URL}>
                <img src="/line-button.png" width="200px" />
              </a>
              <div className={styles.procedure}>
                <h3>２. 承認</h3>
                <p>
                  貸してくれた人に貸し借り情報を登録をしてもらってください！
                  登録の手順は上に書いてあります。
                </p>
                <p>
                  登録が終わったらボタン付きのメッセージが届くので、「情報を確認する」をタップ！
                  内容を確認して「はい」を選択してください。
                </p>
                <div className={styles.img}>
                  <img src="/line-create2.PNG" width="100%" />
                </div>
              </div>
              <div className={styles.procedure}>
                <h3>３. 通知</h3>
                <p>返し忘れてても大丈夫です！</p>
                <p>
                  期限を過ぎたら毎日20:00にLINEが届くようになります。通知を確認したらちゃんと返しましょう！
                </p>
              </div>
            </div>
          </section>
          <footer className={styles.footer}>
            <p>
              <small>そてそてすずめ</small>
            </p>
          </footer>
        </div>
      </article>
    </>
  )
}

export default HowTo
