from typing import List

from src.domain.entity import WantToBorrowEntity
from src.domain.repository import WantToBorrowRepository


class WantToBorrowUseCase:
    def __init__(self, repository: WantToBorrowRepository):
        self.repository = repository

    def add_want_to_borrow(self, user_id: str, content: str) -> int:
        """
        借りたいものを追加する

        Parameters
        ----------
        user_id: str
            借りたいものを登録するユーザーのuser_id
        content: str
            借りたいもの
        Returns
        -------
        int
            追加された借りたいもののid
        """
        return self.repository.add_want_to_borrow(user_id, content)

    def fetch_friends_want_to_borrow_list(self, user_id: str) -> dict:
        """
        user_idのユーザーの借りたいものリストを取得する

        Parameters
        ----------
        user_id: str
            借りたいものリストを取得するユーザーのid

        Returns
        -------
        dict
            ユーザーの各フレンドの借りたいもののリスト
            {
              '<フレンドのuser_id: str>: WantToBorrowEntity[],
              ...
            }
        """
        return self.repository.fetch_want_to_borrow_list(user_id)

    def delete_want_to_borrow(self, want_to_borrow_id: int) -> str:
        """
        借りたいものリストから1つを削除する。

        Parameters
        ----------
        want_to_borrow_id: int
            削除する借りたいもののid

        Returns
        -------
        str
            削除された借りたいもの
        """
        return self.repository.delete_want_to_borrow(want_to_borrow_id)

    def __repr__(self):
        return f'WantToBorrowUseCase("{self.repository}")'
