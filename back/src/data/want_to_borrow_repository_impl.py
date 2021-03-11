from src import db
from src.domain.repository import WantToBorrowRepository
from src.model import WantToBorrow
from src.consts.exceptions import InvalidArgumentException


class WantToBorrowRepositoryImpl(WantToBorrowRepository):
    def add_want_to_borrow(self, user_id: str, content: str) -> int:
        want_to_borrow = WantToBorrow()
        want_to_borrow.user_id = user_id
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

        wan_to_borrow = query.first().content

        query.delete()

        db.session.commit()

        return wan_to_borrow

    def is_valid_user(self, user_id: str, want_to_borrow_id: int) -> bool:
        want_to_borrow = db.session.query(WantToBorrow.user_id) \
            .filter(WantToBorrow.id == want_to_borrow_id) \
            .first()

        if want_to_borrow is None:
            raise InvalidArgumentException(f"want_to_borrow_id {want_to_borrow_id} was not found.")

        return want_to_borrow.user_id == user_id
