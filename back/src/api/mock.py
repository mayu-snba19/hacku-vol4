import datetime

from flask import Blueprint, jsonify

api = Blueprint("api_mock", __name__)


@api.route("/lending", methods=["POST"])
def mock_add_lending() -> object:
    return jsonify({
        "lendingId": 1
    })


@api.route("/lending/<int:lending_id>", methods=["PUT"])
def mock_associate_borrower(lending_id: int) -> object:
    return jsonify({
        "lendingId": 1,
        "content": "something",
        "deadline": datetime.datetime(2021, 3, 4),
        "ownerName": "I am a owner"
    })


@api.route("/owner/lending", methods=["GET"])
def mock_list_of_lent() -> object:
    return jsonify({
        "lendingList": [
            {
                "lendingId": 1,
                "content": "something-1",
                "deadline": datetime.datetime(2021, 3, 1),
                "borrowerName": "someone-1"
            },
            {
                "lendingId": 2,
                "content": "something-2",
                "deadline": datetime.datetime(2021, 3, 2),
                "borrowerName": "someone-2"
            },
            {
                "lendingId": 3,
                "content": "something-3",
                "deadline": datetime.datetime(2021, 3, 3),
                "borrowerName": "someone-3"
            },
            {
                "lendingId": 4,
                "content": "something-4",
                "deadline": datetime.datetime(2021, 3, 4),
                "borrowerName": "someone-4"
            },
        ]
    })


@api.route("/borrower/lending", methods=["GET"])
def mock_list_of_borrow() -> object:
    return jsonify({
        "lendingList": [
            {
                "lendingId": 1,
                "content": "something-1",
                "deadline": datetime.datetime(2021, 3, 1),
                "borrowerName": "someone-1"
            },
            {
                "lendingId": 2,
                "content": "something-2",
                "deadline": datetime.datetime(2021, 3, 2),
                "borrowerName": "someone-2"
            },
            {
                "lendingId": 3,
                "content": "something-3",
                "deadline": datetime.datetime(2021, 3, 3),
                "borrowerName": "someone-3"
            },
            {
                "lendingId": 4,
                "content": "something-4",
                "deadline": datetime.datetime(2021, 3, 4),
                "borrowerName": "someone-4"
            },
        ]
    })


@api.route("/lending/<int:lending_id>", methods=["DELETE"])
def mock_return_lending(lending_id: int) -> object:
    return jsonify({
        "lendingId": 1,
        "borrowerName": "someone",
        "content": "something",
        "deadline": datetime.datetime(2021, 3, 4),
    })
