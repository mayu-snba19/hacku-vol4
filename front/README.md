# フロントエンド

## 開発
1. フロントディレクトに移動
    ```bash
    cd front
    ```

2. （初回のみ）依存ライブラリをインストール
    ```bash
    npm install
    ```

3. 開発サーバーの起動（デフォルトで`http://localhost:3000`）
    ```bash
    npm run dev
    ```

4. ESLint
    ```bash
    npm run lint      # linterを走らせる
    npm run lint:fix  # linterを走らせ修正を行う
    ```

## デプロイ
5. ビルド
    ```bash
    npm run build
    ```

6. デプロイ

    🚧

### その他
- 型チェック
    ```bash
    npm run typecheck
    ```

- 保存時に自動フォーマット
    - VSCodeで [Visual Studio Code Market Place: ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) と [Visual Studio Code Market Place: Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) の拡張機能をインストールすると保存時に自動でフォーマットされます

### 開発時の注意事項
- `tailwind.config.js`の`purge`に、tailindを適用するファイルを指定する必要あり。