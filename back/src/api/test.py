from flask import Blueprint, jsonify

api = Blueprint("api_test", __name__)


@api.route("/test", methods=["GET"])
def test() -> object:
    response = {
        "status": "success",
        "result": "This is a test response."
    }

    return jsonify(response)
