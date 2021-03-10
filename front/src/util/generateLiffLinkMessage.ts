import LendingToken from '~/types/lendingToken'

const LIFF_BASE_URL = process.env.NEXT_PUBLIC_LIFF_URL

const generateLiffLink = (token: LendingToken) => {
  return `${LIFF_BASE_URL}/borrowing/link?lendingId=${encodeURIComponent(
    token as string,
  )}`
}

/**
 * 貸出情報を登録して得られたトークンから、借りる人へ送るLiffのリンクを生成する
 * @param token 貸出トークン
 */
const buildLiffLinkMessage = (
  token: LendingToken,
  displayName: string,
  content: string,
): string => {
  return `【返してほしいちゅん】
  ${displayName}さんが「${content}」を貸し出し登録しました。

  以下URLから承認してください。
  ${generateLiffLink(token)}`
}

export default buildLiffLinkMessage
