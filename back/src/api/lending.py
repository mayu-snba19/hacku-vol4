from flask import Blueprint, jsonify, request, abort
import datetime

from src.api.service.lending import LendingService
from src.api.service.auth import required_auth, get_token
from src.consts.exceptions import InvalidOwnerException

api = Blueprint("api_lending", __name__)


@api.route('/lending', methods=["POST"])
@required_auth
def register_lending():
    """ 貸出情報の登録
    Parameters
    -------
    accessToken: str
        貸す人のアクセストークン
    content: str
        貸したもの
    deadline: datetime
        返却期限

    Returns
    -------
    lendingId: int
        貸出ID
    createdAt: str
        返却日
    """
    # パラメータの取得
    payload = request.json
    token: str = get_token()
    content: str = payload.get("content")
    deadline: datetime = payload.get("deadline")

    lending = LendingService(token)
    lending_id, created_at = lending.register_lending(content, deadline)

    return jsonify({"lendingId": lending_id, "createdAt": created_at})


@api.route("/lending/<lending_id>", methods=["PUT"])
@required_auth
def register_borrower(lending_id):
    """ 借りた人の登録
    Parameters
    -------
    lending_id: int
        貸出ID
    accessToken: str
        借りた人のアクセストークン

    Returns
    -------
    lending_id: int
        貸出ID
    content: str
        貸出内容
    deadline: datetime
        返却期限
    owner_name: str
        貸した人の名前
    """
    token: str = get_token()
    lending = LendingService(token)
    content, deadline, owner_name = lending.register_borrower(lending_id)

    return jsonify({
        "lending_id": lending_id,
        "content": content,
        "deadline": deadline,
        "ownerName": owner_name
    })


@api.route("/owner/lending", methods=["GET"])
@required_auth
def get_owner_lending():
    """ 貸したもの一覧取得
    accessToken: str
        accessToken
    Returns
    -------
    lendingList: list
        lendingId: str
            貸出ID
        content: str
            貸出内容
        deadline: datetime
            返却日
        borrowerName: str
            借りた人の名前
    """
    token = get_token()
    lending = LendingService(token)
    data = lending.get_owner_lending()
    return jsonify({"lendingList": data})


@api.route("/borrower/lending", methods=["GET"])
@required_auth
def get_borrower_lending():
    """ 借りたもの一覧

    Returns
    -------
    lendingList: list
        lendingId: str
            貸出ID
        content: str
            貸出内容
        deadline: datetime
            返却日
        borrowerName: str
            借りた人の名前
    """
    token = get_token()
    lending = LendingService(token)
    data = lending.get_borrower_lending()

    return jsonify({"lendingList": data})


@api.route("/lending/<lending_id>", methods=["DELETE"])
@required_auth
def register_lending_return(lending_id):
    """ 返却報告
    Parameters
    -------
    lending_id: int
        貸出ID
    accessToken: str
        貸した人のアクセストークン

    Returns
    -------
    lending_id: int
        貸出ID
    content: str
        貸出内容
    deadline: datetime
        返却期限
    borrowerName: str
        借りた人の名前
    """
    token = get_token()
    lending = LendingService(token)

    try:
        content, deadline, borrower_name = lending.register_lending_return(lending_id)
    except InvalidOwnerException:
        abort(403, {
            "code": "invalid_user",
            "description": "The user who requested is not a owner of the lending."
        })
        return

    return jsonify({
        "lendingId": lending_id,
        "borrowerName": borrower_name,
        "content": content,
        "deadline": deadline
    })
