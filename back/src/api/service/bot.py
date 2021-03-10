import json
import os
import random

from linebot import (
    LineBotApi, WebhookHandler
)
from linebot.models import (
    MessageEvent, TextMessage, TextSendMessage, FlexSendMessage
)

from src.data import LendingRepositoryImpl, UserRepositoryImpl
from src.domain.use_case import LendingUseCase


class BotService:
    def __init__(self):
        self.line_bot_api = LineBotApi(os.environ.get('YOUR_CHANNEL_ACCESS_TOKEN'))
        self.handler = WebhookHandler(os.environ.get('YOUR_CHANNEL_SECRET'))
        self.lending_use_case = LendingUseCase(LendingRepositoryImpl(UserRepositoryImpl()))

        @self.handler.add(MessageEvent, message=TextMessage)
        def handle_message(event):
            # deadline_lending_list = lending_use_case.fetch_deadline_lending_list()
            # for borrower_id, lendings in deadline_lending_list.items():
            # borrower_id = 'U646d24344e76b9a2454a35de1403b604'

            request_text: str = event.message.text
            print(request_text)
            request_message, lending_id = request_text.split()
            print(request_message)
            print(lending_id)

            lending = self.lending_use_case.fetch_lending(lending_id)
            is_confirming_returned = lending.is_confirming_returned
            borrower_id = lending.borrower_id

            if not is_confirming_returned:
                random_message = ['チュン！', 'チュンチュン！', 'メッセージありがとチュン！']
                self.line_bot_api.reply_message(event.reply_token, TextSendMessage(text=random.choice(random_message)))
                return

            if request_message == 'はい':
                self.line_bot_api.reply_message(event.reply_token, TextSendMessage(text='返ってきてよかったチュン！'))
                self.line_bot_api.push_message(borrower_id, TextSendMessage(text='返してくれてありがとチュン！'))
                self.lending_use_case.register_return_lending(lending_id)
                self.lending_use_case.finish_confirming_returned(lending_id)

            elif request_message == 'いいえ':
                self.line_bot_api.reply_message(
                    event.reply_token, [
                        TextSendMessage(text='悲しいチュン...'),
                        TextSendMessage(text='早く返してって言ってくるチュン！')
                    ]
                )
                self.line_bot_api.push_message(
                    borrower_id,
                    TextSendMessage(text='早く返して欲しいチュン!（もし既に返してたら申し訳ないチュン...借りた側に通知解除してって言って欲しいチュン...')
                )
                self.lending_use_case.finish_confirming_returned(lending_id)

            else:
                self.line_bot_api.reply_message(
                    event.reply_token,
                    TextSendMessage(text='「はい」か「いいえ」で答えて欲しいチュン。')
                )

            # with open('./confirm_message.json') as f:
            #     confirm_message = json.load(f)
            #     self.line_bot_api.reply_message(
            #         event.reply_token,
            #         FlexSendMessage(alt_text='hogeさんに貸したpiyo返ってきたチュン？', contents=confirm_message)
            #     )

    def handle_hook(self, body, signature):
        self.handler.handle(body, signature)
