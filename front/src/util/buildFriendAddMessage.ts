import { SendMessagesParams } from '@line/liff/dist/lib/api/sendMessages'

const buildLiffLinkMessage = (userId: string): SendMessagesParams => {
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
                          text: '「返して欲しいでチュン」への招待が届いたよ。',
                        },
                      ],
                      size: 'sm',
                      wrap: true,
                      offsetBottom: 'none',
                    },
                  ],
                  justifyContent: 'center',
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
                    label: '使ってみる！',
                    uri: `${LIFF_URL}/friends/add?friendId=${userId}`,
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
    },
  ] as SendMessagesParams
}

export default buildLiffLinkMessage
