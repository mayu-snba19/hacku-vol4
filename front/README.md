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
      └─ repository/  APIとのやりとりを行う部分
```

## 開発
1. フロントディレクトに移動
    ```bash
    cd front
    ```

2. （初回のみ）依存ライブラリをインストール
    ```bash
    npm install
    ```

3. （初回のみ）`.env.local`ファイルを作成し、`.env.example`の内容をコピペし、正しい環境変数を設定

4. 開発サーバーの起動（デフォルトで`http://localhost:3000`）
    ```bash
    npm run dev
    ```

5. ESLint
    ```bash
    npm run lint      # linterを走らせる
    npm run lint:fix  # linterを走らせ修正を行う
    ```

## デプロイ
6. ビルド
    ```bash
    npm run build
    ```

7. デプロイ

    🚧

### その他
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