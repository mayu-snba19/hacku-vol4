from src import db
from src.domain.repository import WantToBorrowRepository
from src.model import WantToBorrow


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
        pass

    def is_valid_user(self, user_id: str, want_to_borrow_id: int) -> bool:
        pass

