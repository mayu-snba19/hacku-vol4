from flask import Flask, request, abort
import os
import random

from linebot import (
    LineBotApi, WebhookHandler
)
from linebot.exceptions import (
    InvalidSignatureError
)
from linebot.models import (
    MessageEvent, TextMessage, TextSendMessage,FollowEvent
)

app = Flask(__name__)

# 環境変数取得
YOUR_CHANNEL_ACCESS_TOKEN = os.environ["YOUR_CHANNEL_ACCESS_TOKEN"]
YOUR_CHANNEL_SECRET = os.environ["YOUR_CHANNEL_SECRET"]

line_bot_api = LineBotApi(YOUR_CHANNEL_ACCESS_TOKEN)
handler = WebhookHandler(YOUR_CHANNEL_SECRET)

@app.route("/")
def hello_world():
    return "hello world!"

@app.route("/callback", methods=['POST'])
def callback():
    # get X-Line-Signature header value
    signature = request.headers['X-Line-Signature']

    # get request body as text
    body = request.get_data(as_text=True)
    app.logger.info("Request body: " + body)

    # handle webhook body
    try:
        handler.handle(body, signature)
    except InvalidSignatureError:
        abort(400)

    return 'OK'

isAnswer=False

@handler.add(FollowEvent)
def handle_follow(event):
    isAnswer=True
    with open('./confirm_message.json') as f:
        confirm_message = json.load(f)
    line_bot_api.reply_message(
        event.reply_token,
        FlexSendMessage(alt_text='hogeさんに貸したpiyo返ってきたチュン？', contents=confirm_message)
    )

@handler.add(MessageEvent, message=TextMessage)
def handle_message(event):
    if isAnswer==True:
      request_message = event.message.text
      with open('./confirm_message.json') as f:
          confirm_message = json.load(f)
      reply_messages=[]
      if request_message=='はい':
        reply_messages.append(TextSendMessage(text='返ってきてよかったチュン！'))
      elif request_message=='いいえ':
        reply_messages.append(TextSendMessage(text='悲しいチュン...'))
        reply_messages.append(TextSendMessage(text='早く返してって言ってくるチュン！'))
      line_bot_api.reply_message(event.reply_token, reply_messages)
      isAnswer=Flase
    else :
      # ランダムなメッセージを送る
      random_message=['チュン！','チュンチュン！','メッセージありがとチュン！']
      def handle_message(event):
          line_bot_api.reply_message(
              event.reply_token,
              TextSendMessage(text=random.choice(random_message)))

if __name__ == "__main__":
#    app.run()
    port = int(os.getenv("PORT"))
    app.run(host="0.0.0.0", port=port)
