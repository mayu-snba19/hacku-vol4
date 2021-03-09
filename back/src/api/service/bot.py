import json
import os
import random

from linebot import (
    LineBotApi, WebhookHandler
)
from linebot.models import (
    MessageEvent, TextMessage, TextSendMessage, FlexSendMessage
)

line_bot_api = LineBotApi(os.environ.get('YOUR_CHANNEL_ACCESS_TOKEN'))
handler = WebhookHandler(os.environ.get('YOUR_CHANNEL_SECRET'))


def handle_hook(body, signature):
    handler.handle(body, signature)


@handler.add(MessageEvent, message=TextMessage)
def handle_message(event):
    # lending_use_case = LendingUseCase(LendingRepositoryImpl(UserRepositoryImpl()))
    is_confirming_returned = True
    borrower_id = 'U646d24344e76b9a2454a35de1403b604'

    request_message = event.message.text

    if request_message == 'はい' and is_confirming_returned:
        line_bot_api.reply_message(event.reply_token, TextSendMessage(text='返ってきてよかったチュン！'))
        line_bot_api.push_message(borrower_id, TextSendMessage(text='返してくれてありがとチュン！'))
        # is_returned = True
        # is_confirming_returned=False

    elif request_message == 'いいえ' and is_confirming_returned:
        line_bot_api.reply_message(
            event.reply_token, [
                TextSendMessage(text='悲しいチュン...'),
                TextSendMessage(text='早く返してって言ってくるチュン！')
            ]
        )
        line_bot_api.push_message(
            borrower_id,
            TextSendMessage(text='早く返して欲しいチュン!（もし既に返してたら申し訳ないチュン...借りた側に通知解除してって言って欲しいチュン...')
        )
        # is_confirming_returned=False

    elif not is_confirming_returned:
        random_message = ['チュン！', 'チュンチュン！', 'メッセージありがとチュン！']
        line_bot_api.reply_message(event.reply_token, TextSendMessage(text=random.choice(random_message)))

    else:
        line_bot_api.reply_message(event.reply_token, TextSendMessage(text='「はい」か「いいえ」で答えて欲しいチュン。'))

    with open('./confirm_message.json') as f:
        confirm_message = json.load(f)
        line_bot_api.reply_message(
            event.reply_token,
            FlexSendMessage(alt_text='hogeさんに貸したpiyo返ってきたチュン？', contents=confirm_message)
        )
