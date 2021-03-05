/**
 * 貸出トークン型
 *
 * 実質string型ですが意味を持たせるために型定義しています。
 * 間違えてトークンを編集してしまうことを防ぎます。
 *
 * 参考: https://basarat.gitbook.io/typescript/main-1/nominaltyping#using-interfaces
 */
type LendingToken = string & { __leadingTokenBrand: never }

export default LendingToken
