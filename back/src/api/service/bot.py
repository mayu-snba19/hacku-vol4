from src.api.service import *
from flask import abort
import random
import json

from linebot import (
    LineBotApi, WebhookHandler
)
from linebot.exceptions import (
    InvalidSignatureError
)
from linebot.models import (
    MessageEvent, TextMessage, TextSendMessage, FollowEvent, FlexSendMessage
)


handler = WebhookHandler(YOUR_CHANNEL_ACCESS_TOKEN)
line_bot_api = LineBotApi(YOUR_CHANNEL_ACCESS_TOKEN)


def handle_hook(body, signature):
    try:
        handler.handle(body, signature)
    except:
        abort(400)
    print("OK")


@handler.add(MessageEvent, message=TextMessage)
def handle_message(event):
    print(event)
    # reply_messages=[]
    # request_message = event.message.text
    # if request_message == 'はい' and 返却処理中 == True:
    #     reply_messages.append(TextSendMessage(text='返ってきてよかったチュン！'))
    #     line_bot_api.reply_message(event.reply_token, reply_messages)
    #     line_bot_api.reply_message(借りた側のユーザーID, text='返してくれてありがとうチュン！')
    #     返却状態=True
    #     返却処理中=False
    # elif request_message=='いいえ' and 返却処理中==True:
    #     reply_messages.append(TextSendMessage(text='悲しいチュン...'))
    #     reply_messages.append(TextSendMessage(text='早く返してって言ってくるチュン！'))
    #     line_bot_api.reply_message(event.reply_token, reply_messages)
    #     line_bot_api.push_message(借りた側のユーザーID, text='早く返して欲しいチュン!（もし既に返してたら申し訳ないチュン...借りた側に通知解除してって言って欲しいチュン...）')
    #     返却処理中=False
    #
    # elif 返却処理中==False:
    #     random_message=['チュン！','チュンチュン！','メッセージありがとチュン！']
    #     line_bot_api.reply_message(event.reply_token,TextSendMessage(text=random.choice(random_message)))
    #
    # else:
    #     line_bot_api.reply_message(event.reply_token, text='「はい」か「いいえ」で答えて欲しいチュン。')
    # with open('./confirm_message.json') as f:
    #     confirm_message = json.load(f)
    #     line_bot_api.reply_message(event.reply_token,FlexSendMessage(alt_text='hogeさんに貸したpiyo返ってきたチュン？', contents=confirm_message))
