from flask import Blueprint, jsonify, request, abort
from src.api.service.auth import required_auth, get_token
from src.api.service.want_to_borrow import WantToBorrowService

api = Blueprint("api_want_to_borrow", __name__)


# 借りたいものリスト取得
@api.route('/want-to-borrow', methods=["GET"])
@required_auth
def get_want_to_borrow():
    token: str = get_token()

    wtb_service = WantToBorrowService(token)
    wtb_list = wtb_service.get_want_to_borrow_list()
    return jsonify(wtb_list)


# 借りたいものリスト追加
@api.route('/want-to-borrow', methods=["POST"])
@required_auth
def post_want_to_borrow():
    payload = request.json
    token: str = get_token()

    wtb_service = WantToBorrowService(token)
    content: str = payload["content"]
    want_to_borrow_id = wtb_service.post_want_to_borrow(content)
    return jsonify({"want_to_borrow_id": want_to_borrow_id})


# 借りたいものリスト削除
@api.route('/want-to-borrow/<int:want_to_borrow_id>', methods=["DELETE"])
@required_auth
def delete_want_to_borrow(want_to_borrow_id):
    token: str = get_token()

    wtb_service = WantToBorrowService(token)
    content: str = wtb_service.delete_want_to_borrow(want_to_borrow_id)
    return jsonify({"content": content})

