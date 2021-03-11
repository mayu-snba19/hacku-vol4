# フロントエンド

## ディレクトリ構成

```
front/
  ├─ public/          静的配信ファイル。画像やフォントなど。
  └─ src/
      ├─ adaptor/     repositoryのうち情報取得系をhooks化して便利に使えるようにしたもの
      ├─ components/  UIコンポーネント
      ├─ liff/        liffの初期化処理及びContextAPIでの配信
      ├─ pages/       Next.jsのページ
      ├─ repository/  APIとのやりとりを行う部分
      ├─ style/       scss/cssファイル
      ├─ test/        テストの設定（環境変数の読み込み）のみ
      ├─ types/       型ファイル
      └─ util/        上記に当てはまらないファイル
```

### テスト対象ファイル
```
**/*.test.ts
```

## 開発
### LIFF機能を利用する方法
1. フロントディレクトに移動
    ```bash
    cd front
    ```

2. （初回のみ）依存ライブラリをインストール
    ```bash
    npm install
    ```

3. （初回のみ）`.env.local`ファイルを作成し、`.env.example`の内容をコピペし、正しい環境変数を設定

4. （初回のみ）localhostをhttps化する（LIFFはhttps化したURLでしか有効にできないため）

    下記コマンドで`/front/src/server/cert`内に`localhost+1.pem`と`localhost+1-key.pem`を生成する（念の為 https://blog.ryou103.com/post/nuxtjs-ssl/ を参照しながらやってください！）

    ```bash
    # Mac
    brew install mkcert
    mkcert -install
    cd src/server/cert
    mkcert localhost 127.0.0.1
    ```

    ※うまく行かない場合、ngrok等を利用し公開URLをLINEデベロッパーツール上の`Endpoint URL`に貼り付けても可能（ただし複数人が同時に開発できなくなるので注意）

5. 開発サーバーの起動（デフォルトで`https://localhost:3000` ← http**s**）
   
   ※ポート番号は3000以外だと動かないので注意（LINEデベロッパーツール上の`Endpoint URL`を変更すればポート番号の変更が可能。ただし他の人にも影響するので注意）
   
    ```bash
    npm run dev
    ```

### LIFF機能を利用しない（UIだけ開発する）方法
1. 上記の手順の1から3を行う

2. `.env.local`内でLIFFをスキップするように設定する（`NEXT_PUBLIC_SKIP_LIFF`を`false`にすれば良い）
   - →やらなくていいようになりました

3. 開発サーバーの起動（デフォルトで`http://localhost:3000` ← http）
    ```bash
    npm run dev:ui
    ```

## デプロイ
1. ビルド
    ```bash
    npm run build
    ```

2. 動作確認
    ```bash
    npm run start
    ```

3. （未インストールの場合は）Vercel cliのインストール
    ```bash
    npm i -g vercel
    ```

4. `vercel`コマンドを実行してデプロイ
    ```bash
    vercel --prod
    ```
5. Vercel Dashboard 上で環境変数を設定する

## テスト
1. （初回のみ）`.env.test`ファイルを作成し、`.env.example`の内容をコピペし、正しい環境変数を設定。
2. テストの実行
    ```bash
    npm test
    ```

    現在はrepositoryのみテストを書いています（Reactに依存しない部分）

### その他
- ESLint
    ```bash
    npm run lint      # linterを走らせる
    npm run lint:fix  # linterを走らせ修正を行う
    ```

- 型チェック
    ```bash
    npm run typecheck
    ```

- 保存時に自動フォーマット
    - VSCodeで [Visual Studio Code Market Place: ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) と [Visual Studio Code Market Place: Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) の拡張機能をインストールすると保存時に自動でフォーマットされます

## 開発時の注意事項
- `tailwind.config.js`の`purge`に、tailindを適用するファイルを指定する必要あり。
- `liff`は基本`const liff = useLiff()`で取得した物を使うようにしてください！未初期化状態でAPIを呼び出してしまうなどのエラーがある程度防げます。
  - Next.jsだとimportした時点でエラー発生するかもです（`_app.tsx`ではdynamic importしてます）