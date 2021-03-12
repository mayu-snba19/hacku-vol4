from sqlalchemy import or_, and_

from src import db
from src.consts.exceptions import AlreadyFriendException
from src.domain.entity import UserEntity
from src.domain.repository import FriendRepository, UserRepository
from src.domain.use_case import UserUseCase
from src.model import Friend, User


class FriendRepositoryImpl(FriendRepository):
    user_use_case: UserUseCase

    def __init__(self, user_repository: UserRepository):
        self.user_use_case = UserUseCase(user_repository)

    def register_friend(self, user_1: UserEntity, user_2: UserEntity) -> [str, str]:
        fetched_user_1 = db.session.query(User).filter(User.id == user_1.id).first()
        if fetched_user_1 is None:
            self.user_use_case.add_user(user_1)

        fetched_user_2 = db.session.query(User).filter(User.id == user_2.id).first()
        if fetched_user_2 is None:
            self.user_use_case.add_user(user_2)

        # あとであるユーザーのフレンド一覧を取得する際にシンプルなクエリで取得できるように、
        # user_idとfriend_idを入れ替えた2つのレコードを作成する

        existing_friend = db.session.query(Friend) \
            .filter(
            or_(
                and_(Friend.user_id == user_1.id, Friend.friend_id == user_2.id),
                and_(Friend.user_id == user_1.id, Friend.friend_id == user_2.id),
            )
        ).first()

        if existing_friend is not None:
            raise AlreadyFriendException(f"users(id: {user_1.id}, {user_2.id}) are already friend.")

        friend = Friend()
        friend.user_id = user_1.id
        friend.friend_id = user_2.id
        db.session.add(friend)

        friend = Friend()
        friend.user_id = user_2.id
        friend.friend_id = user_1.id
        db.session.add(friend)

        db.session.commit()

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
