import LendingToken from '~/types/lendingToken'

const LIFF_BASE_URL = process.env.LIFF_BASE_URL

// TODO: とりあえず適当なURLを入れてます（yuta-ike）
const LIFF_BORROWER_REGISTER_PAGE_URL = `${LIFF_BASE_URL}/lending`

/**
 * 貸出情報を登録して得られたトークンから、借りる人へ送るLiffのリンクを生成する
 * @param token 貸出トークン
 */
const generateLiffLinkFromToken = (token: LendingToken): string => {
  return `${LIFF_BORROWER_REGISTER_PAGE_URL}?token=${token}`
}

export default generateLiffLinkFromToken
