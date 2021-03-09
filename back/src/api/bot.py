from flask import Blueprint, jsonify, request, abort

from src.api.service.bot import *

api = Blueprint("api_bot", __name__)


@api.route("/", methods=["GET"])
def hoge():
    signature = request.headers['X-Line-Signature']
    body = request.get_data(as_text=True)
    handle_hook(body, signature)
    return jsonify({"status": "OK"})
