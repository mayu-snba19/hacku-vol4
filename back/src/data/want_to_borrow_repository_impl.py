from typing import List

from src import db
from src.domain.repository import WantToBorrowRepository, UserRepository
from src.domain.use_case import UserUseCase
from src.domain.entity import UserEntity, WantToBorrowEntity
from src.model import WantToBorrow, User, Friend
from src.consts.exceptions import InvalidArgumentException


class WantToBorrowRepositoryImpl(WantToBorrowRepository):
    user_use_case: UserUseCase

    def __init__(self, user_repository: UserRepository):
        self.user_use_case = UserUseCase(user_repository)

    def add_want_to_borrow(self, user: UserEntity, content: str) -> int:
        fetched_user = db.session.query(User).filter(User.id == user.id).first()
        if fetched_user is None:
            self.user_use_case.add_user(user)

        want_to_borrow = WantToBorrow()
        want_to_borrow.user_id = user.id
        want_to_borrow.content = content
        db.session.add(want_to_borrow)

        db.session.flush()
        db.session.commit()

        return want_to_borrow.id

    def fetch_want_to_borrow_list(self, user_id: str) -> List[WantToBorrowEntity]:
        want_to_borrows = db.session.query(WantToBorrow.id, WantToBorrow.content) \
            .filter(WantToBorrow.user_id == user_id) \
            .all()

        return [
            WantToBorrowEntity(
                want_to_borrow.id,
                user_id,
                want_to_borrow.content
            ) for want_to_borrow in want_to_borrows
        ]

    def fetch_friends_want_to_borrow_list(self, user_id: str) -> dict:
        results = db.session.query(
            User.id.label('friend_id'),
            User.name.label('friend_name'),
            WantToBorrow.id.label('want_to_borrow_id'),
            WantToBorrow.content
        ) \
            .join(Friend, User.id == Friend.friend_id) \
            .outerjoin(WantToBorrow, User.id == WantToBorrow.user_id) \
            .filter(Friend.user_id == user_id) \
            .all()

        want_to_borrow_list = {}
        for result in results:
            if result.friend_id not in want_to_borrow_list.keys():
                want_to_borrow_list[result.friend_id] = {
                    'name': result.friend_name,
                    'want_to_borrow_list': []
                }

            # left joinしているので、WantToBorrowがないフレンドもいる
            # その場合は要素を追加せずにスキップする
            if result.want_to_borrow_id is None:
                continue

            want_to_borrow_list[result.friend_id]['want_to_borrow_list'].append(
                WantToBorrowEntity(
                    result.want_to_borrow_id,
                    result.friend_id,
                    result.content
                )
            )

        return want_to_borrow_list

    def delete_want_to_borrow(self, want_to_borrow_id: int) -> str:
        query = db.session.query(WantToBorrow.content) \
            .filter(WantToBorrow.id == want_to_borrow_id)

        want_to_borrow = query.first()
        if want_to_borrow is None:
            raise InvalidArgumentException(f"want_to_borrow_id {want_to_borrow_id} was not found.")

        content_to_be_deleted = want_to_borrow.content

        query.delete()
        db.session.commit()

        return content_to_be_deleted

    def is_valid_user(self, user_id: str, want_to_borrow_id: int) -> bool:
        want_to_borrow = db.session.query(WantToBorrow.user_id) \
            .filter(WantToBorrow.id == want_to_borrow_id) \
            .first()

        if want_to_borrow is None:
            raise InvalidArgumentException(f"want_to_borrow_id {want_to_borrow_id} was not found.")

        return want_to_borrow.user_id == user_id
