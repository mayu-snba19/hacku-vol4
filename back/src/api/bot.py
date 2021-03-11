from flask import Blueprint, jsonify, request, abort
from linebot.exceptions import InvalidSignatureError

from src.api.service.bot import BotService

api = Blueprint("api_bot", __name__)


@api.route("/", methods=["POST"])
def callback():
    signature = request.headers['X-Line-Signature']
    body = request.get_data(as_text=True)

    bot_service = BotService()

    try:
        bot_service.handle_hook(body, signature)
    except InvalidSignatureError as e:
        print(e)
        abort(403)

    return jsonify({"status": "OK"})
