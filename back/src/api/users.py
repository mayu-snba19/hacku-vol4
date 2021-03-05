from flask import Blueprint, jsonify
from src.model.user import *

api = Blueprint("api_users", __name__)


@api.route("/users", methods=["GET"])
def fetch_all_users() -> object:
    try:
        users = db.session.query(User).all()
    except BaseException as e:
        print(e)
        return jsonify({"status": "error"})

    response = {
        "status": "success",
        "result": {
            "users": [user.to_dict() for user in users]
        }
    }

    return jsonify(response)
