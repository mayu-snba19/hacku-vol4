from flask import Blueprint, request, jsonify

from src.api.service import required_auth, FriendService

api = Blueprint("api_friend", __name__)


@api.route('/friend', methods=['POST'])
@required_auth
def register_friend():
    payload = request.json
    friend_service = FriendService(payload)
    user_name, friend_name = friend_service.register_friend()

    return jsonify({
        'user_name': user_name,
        'friend_name': friend_name
    })
