from flask import Blueprint, request, jsonify

from src.consts.exceptions import AlreadyFriendException
from src.api.service import required_auth, FriendService

api = Blueprint("api_friend", __name__)


@api.route('/friend', methods=['POST'])
@required_auth
def register_friend():
    payload = request.json
    friend_service = FriendService(payload)
    try:
        user_name, friend_name = friend_service.register_friend()
    except AlreadyFriendException as e:
        print(e)
        return jsonify({
            'status_code': 409,
            'error_code': 'Conflict',
            'error': e.message
        }), 409

    return jsonify({
        'user_name': user_name,
        'friend_name': friend_name
    })
