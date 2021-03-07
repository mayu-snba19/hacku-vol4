from typing import List

from src.domain.entity import WantToBorrowEntity
from src.domain.repository import WantToBorrowRepository


class WantToBorrowUseCase:
    def __init__(self, repository: WantToBorrowRepository):
        self.repository = repository

    def add_want_to_borrow(self, want_to_borrow: WantToBorrowEntity) -> int:
        """
        借りたいものを追加する

        Parameters
        ----------
        want_to_borrow: WantToBorrowEntity
            借りたいもの
        """
        return self.repository.add_want_to_borrow(want_to_borrow)

    def fetch_want_to_borrow_list(self, user_id: str) -> List[WantToBorrowEntity]:
        """
        user_idのユーザーの借りたいものリストを取得する

        Parameters
        ----------
        user_id: str
            借りたいものリストを取得するユーザーのid

        Returns
        -------
        want_to_borrow[]: List[WantToBorrowEntity]
            借りたいもののリスト
        """
        return self.repository.fetch_want_to_borrow_list(user_id)

    def delete_want_to_borrow(self, want_to_borrow_id: int) -> WantToBorrowEntity:
        """
        借りたいものリストから1つを削除する

        Parameters
        ----------
        want_to_borrow_id: int
            削除する借りたいもののid

        Returns
        -------
        want_to_borrow: WantToBorrowEntity
            削除された借りたいもの
        """
        return self.repository.delete_want_to_borrow(want_to_borrow_id)

    def __repr__(self):
        return f'WantToBorrowUseCase("{self.repository}")'
