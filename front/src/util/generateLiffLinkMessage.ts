import { SendMessagesParams } from '@line/liff/dist/lib/api/sendMessages'
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
  content: string,
): SendMessagesParams => {
  const LIFF_URL = process.env.NEXT_PUBLIC_LIFF_URL
  return [
    {
      type: 'flex',
      contents: {
        type: 'bubble',
        body: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'box',
              layout: 'horizontal',
              contents: [
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'image',
                      url: 'https://kaesitehosiityun.vercel.app/suzume.jpg',
                      aspectMode: 'cover',
                      size: 'full',
                    },
                  ],
                  cornerRadius: '100px',
                  width: '72px',
                  height: '72px',
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      contents: [
                        {
                          type: 'span',
                          text: `「${
                            content.slice(0, 20) +
                            (content.length > 20 ? '…' : '')
                          }」の貸し出しが登録されたチュン`,
                        },
                      ],
                      size: 'sm',
                      wrap: true,
                      offsetBottom: 'none',
                    },
                    {
                      type: 'text',
                      text: '以下のURLからリマインドが届くようにするチュン',
                      contents: [
                        {
                          type: 'span',
                          text: '下のボタンから確認するチュン',
                        },
                      ],
                      wrap: true,
                      size: 'sm',
                      offsetTop: 'none',
                      margin: 'md',
                    },
                  ],
                },
              ],
              spacing: 'xl',
              paddingTop: '20px',
              paddingStart: '20px',
              paddingEnd: '20px',
            },
            {
              type: 'box',
              layout: 'horizontal',
              contents: [
                {
                  type: 'text',
                  text: '返して欲しいでチュン',
                  size: 'xs',
                  color: '#bcbcbc',
                  align: 'end',
                },
              ],
              justifyContent: 'flex-end',
              paddingStart: 'lg',
              paddingEnd: 'lg',
            },
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'button',
                  action: {
                    type: 'uri',
                    label: '情報を確認する',
                    uri: generateLiffLink(token),
                  },
                  style: 'primary',
                  margin: 'md',
                },
                {
                  type: 'button',
                  action: {
                    type: 'uri',
                    label: 'サービスの説明を見る',
                    uri: `${LIFF_URL}/how-to`,
                  },
                  margin: 'md',
                  height: 'md',
                  style: 'secondary',
                },
              ],
              paddingAll: 'md',
            },
          ],
          paddingAll: '0px',
        },
      },
    } as any,
  ]
}

export default buildLiffLinkMessage
