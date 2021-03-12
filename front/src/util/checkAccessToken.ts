/**
 * アクセストークンの有無をチェックする
 * @param accessToken アクセストークン
 */
const checkAccessToken = (accessToken: string) => {
  if (accessToken == null || accessToken === '') {
    throw new AccessTokenNotSetError('アクセストークンが指定されていません')
  }
}

class AccessTokenNotSetError extends Error {}

export default checkAccessToken
