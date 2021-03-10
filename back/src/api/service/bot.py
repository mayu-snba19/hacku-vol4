import os
import random

from linebot import (
    LineBotApi, WebhookHandler
)
from linebot.models import (
    MessageEvent, TextMessage, TextSendMessage
)

from src.data import LendingRepositoryImpl, UserRepositoryImpl
from src.domain.use_case import LendingUseCase


class BotService:
    def __init__(self):
        self.line_bot_api = LineBotApi(os.environ.get('YOUR_CHANNEL_ACCESS_TOKEN'))
        self.handler = WebhookHandler(os.environ.get('YOUR_CHANNEL_SECRET'))
        self.lending_use_case = LendingUseCase(LendingRepositoryImpl(UserRepositoryImpl()))

        @self.handler.add(MessageEvent, message=TextMessage)
        def handle_message(event: MessageEvent):
            # deadline_lending_list = lending_use_case.fetch_deadline_lending_list()
            # for borrower_id, lendings in deadline_lending_list.items():

            request_text: str = event.message.text
            split_request_text = request_text.split()

            if len(split_request_text) is not 2:
                self._response_random(event.reply_token)
                return

            request_message, lending_id = split_request_text

            lending = self.lending_use_case.fetch_lending(lending_id)
            is_confirming_returned = lending.is_confirming_returned
            borrower_id = lending.borrower_id

            if not is_confirming_returned:
                self._response_random(event.reply_token)
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
                    TextSendMessage(
                        text='早く返して欲しいチュン!\n'
                             '（もし既に返してたら申し訳ないチュン...\n'
                             '借りた側に通知解除してって言って欲しいチュン...)'
                    )
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

    def _response_random(self, reply_token: str):
        random_message = ['チュン！', 'チュンチュン！', 'メッセージありがとチュン！', 'やっほーだチュン！']
        self.line_bot_api.reply_message(reply_token, TextSendMessage(text=random.choice(random_message)))

    def handle_hook(self, body, signature):
        self.handler.handle(body, signature)
