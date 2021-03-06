import LendingToken from '~/types/lendingToken'

const LIFF_BASE_URL = process.env.LIFF_BASE_URL

// TODO: とりあえず適当なURLを入れてます（yuta-ike）
const liffBorrowerRegisterPageUrl = `${LIFF_BASE_URL}/lending`

/**
 * 貸出情報を登録して得られたトークンから、借りる人へ送るLiffのリンクを生成する
 * @param token 貸出トークン
 */
const generateLiffLinkFromToken = (token: LendingToken): string => {
  return `${liffBorrowerRegisterPageUrl}?token=${token}`
}

export default generateLiffLinkFromToken
