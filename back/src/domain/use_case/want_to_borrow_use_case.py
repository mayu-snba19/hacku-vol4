from typing import List

from src.domain.entity import UserEntity, WantToBorrowEntity
from src.domain.repository import WantToBorrowRepository


class WantToBorrowUseCase:
    def __init__(self, repository: WantToBorrowRepository):
        self.repository = repository

    def add_want_to_borrow(self, user: UserEntity, content: str) -> int:
        """
        借りたいものを追加する

        Parameters
        ----------
        user: UserEntity
            借りたいものを登録するユーザー
        content: str
            借りたいもの
        Returns
        -------
        int
            追加された借りたいもののid
        """
        return self.repository.add_want_to_borrow(user, content)

    def fetch_want_to_borrow_list(self, user_id: str) -> List[WantToBorrowEntity]:
        """
        あるユーザーの借りたいものリストを取得する

        Parameters
        ----------
        user_id: str
            ユーザーID

        Returns
        -------
        List[WantToBorrowEntity]
            借りたいものリストの一覧
        """
        return self.repository.fetch_want_to_borrow_list(user_id)

    def fetch_friends_want_to_borrow_list(self, user_id: str) -> dict:
        """
        user_idのユーザーの全フレンドの借りたいものリストを取得する

        Parameters
        ----------
        user_id: str
            フレンドの借りたいものリストを取得するユーザーのid

        Returns
        -------
        dict
        {
          '<フレンドのuser_id: str>: {
            'user_name': str,
            'want_to_borrow_list': WantToBorrowEntity[]
          },
          ...
        }
            ユーザーの各フレンドの名前と借りたいもののリストの一覧
        """
        return self.repository.fetch_friends_want_to_borrow_list(user_id)

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

    def is_valid_user(self, user_id: str, want_to_borrow_id: int) -> bool:
        """
        ユーザーが借りたいものリストの指定された項目の所有者であるかを確認する

        Parameters
        ----------
        user_id: str
            ユーザーid
        want_to_borrow_id: int
            借りたいものリストの1項目

        Returns
        --------
        bool
            ユーザーが借りたいものリストの項目の所有者であればTrue、そうでなければFalseを返す
        """
        return self.repository.is_valid_user(user_id, want_to_borrow_id)

    def __repr__(self):
        return f'WantToBorrowUseCase("{self.repository}")'
