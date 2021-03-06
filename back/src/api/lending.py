from flask import Blueprint, jsonify, request
from src.api.service.lending import LendingService

api = Blueprint("api_lending", __name__)


@api.route('/lending', methods=["POST"])
def register_lending():
    """ 貸出情報の登録

    :param accessToken: アクセストークン
    :type accessToken: str
    :param content: 貸出内容
    :type content: str
    :param deadline: 返却期限日
    :type deadline: str

    :return lendingId: 貸出 ID
    :type lendingId: int
    """
    # パラメータの取得
    payload = request.json
    token: str = payload.get("accessToken")
    content: str = payload.get("content")
    deadline: str = payload.get("deadline")

    lending = LendingService(token)
    lending_id, time = lending.register(content, deadline)

    return jsonify({"lendingId": lending_id})
