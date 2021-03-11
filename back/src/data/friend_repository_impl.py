from sqlalchemy import or_, and_

from src import db
from src.domain.repository import FriendRepository
from src.model import Friend, User


class FriendRepositoryImpl(FriendRepository):
    def register_friend(self, user_id_1: str, user_id_2: str) -> [str, str]:
        # あとであるユーザーのフレンド一覧を取得する際にシンプルなクエリで取得できるように、
        # user_idとfriend_idを入れ替えた2つのレコードを作成する

        friend = Friend()
        friend.user_id = user_id_1
        friend.friend_id = user_id_2
        db.session.add(friend)

        friend = Friend()
        friend.user_id = user_id_2
        friend.friend_id = user_id_1
        db.session.add(friend)

        db.session.commit()

        user_1 = db.session.query(User.name) \
            .filter(User.id == user_id_1) \
            .first()

        user_2 = db.session.query(User.name) \
            .filter(User.id == user_id_2) \
            .first()

        return [user_1.name, user_2.name]

    def unregister_friend(self, user_id_1: str, user_id_2: str) -> [str, str]:
        db.session.query(Friend) \
            .filter(
            or_(
                and_(Friend.user_id == user_id_1, Friend.friend_id == user_id_2),
                and_(Friend.user_id == user_id_2, Friend.friend_id == user_id_1),
            )
        ) \
            .delete()

        db.session.commit()

        user_1 = db.session.query(User.name) \
            .filter(User.id == user_id_1) \
            .first()

        user_2 = db.session.query(User.name) \
            .filter(User.id == user_id_2) \
            .first()

        return [user_1.name, user_2.name]
