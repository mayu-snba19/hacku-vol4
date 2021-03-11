from src import db
from src.domain.repository import WantToBorrowRepository, UserRepository
from src.domain.use_case import UserUseCase
from src.domain.entity import UserEntity
from src.model import WantToBorrow, User
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

    def fetch_want_to_borrow_list(self, user_id: str) -> dict:
        pass

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
