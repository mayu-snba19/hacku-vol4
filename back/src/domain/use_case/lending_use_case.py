from datetime import datetime
from typing import List

from src.domain.entity import UserEntity, LendingEntity
from src.domain.repository import LendingRepository


class LendingUseCase:
    def __init__(self, repository: LendingRepository):
        self.repository = repository

    def add_lending(self, owner: UserEntity, content: str, deadline: datetime) -> int:
        """
        貸借りを登録する

        Parameters
        ----------
        owner: UserEntity
            貸したユーザー
        content: str
            貸したもの
        deadline: datetime
            貸借りの期限

        Returns
        -------
        lending_id: int
            登録された貸借りのid
        """
        return self.repository.add_lending(owner, content, deadline)

    def associate_borrower(self, lending_id: int, borrower: UserEntity) -> LendingEntity:
        """
        貸借りに借りたユーザーを紐付ける

        Parameters
        ----------
        lending_id: int
            貸借りのid
        borrower: UserEntity
            借りたユーザー

        Returns
        -------
        lending: LendingEntity
            紐づけられた貸借り
        """
        return self.repository.associate_borrower(lending_id, borrower)

    def fetch_lent_list(self, owner_id: str) -> List[LendingEntity]:
        """
        あるユーザーの貸したものリストを取得する

        Parameters
        ----------
        owner_id: str
            貸したユーザーのid

        Returns
        -------
        lending[]: List[LendingEntity]
            貸したものリスト
        """
        return self.repository.fetch_lent_list(owner_id)

    def fetch_borrowed_list(self, borrower_id: str) -> List[LendingEntity]:
        """
        あるユーザーの借りたものリストを取得する

        Parameters
        ----------
        borrower_id: str
            借りたユーザーのid

        Returns
        -------
        lending[]: List[LendingEntity]
            借りたものリスト
        """
        return self.repository.fetch_borrowed_list(borrower_id)

    def register_return_lending(self, lending_id: int) -> LendingEntity:
        """
        返却登録をする

        Parameters
        ----------
        lending_id: int
            貸借りのid

        Returns
        -------
        lending: LendingEntity

        """
        return self.repository.register_return_lending(lending_id)

    def is_valid_owner(self, lending_id: int, user_id: str) -> bool:
        """
        user_idのユーザーが、lending_idの貸出の貸出者であればTrueを返し、
        そうでなければFalseを返す。

        Parameters
        ----------
        lending_id: int
            貸出id
        user_id: str
            返却方向をしてきたユーザーのid

        Returns
        -------
        is_valid_owner: bool
            返却報告をしてきたユーザーが、貸出の正当な貸出者かどうか
        """
        return self.repository.is_valid_owner(lending_id, user_id)

    def fetch_deadline_lending_list(self) -> object:
        """
        各借りた人の、期限が本日の貸し出しのリストを取得する

        Returns
        -------
        deadline_lending_list: List[object]
           各借りた人の、期限が本日の貸し出しのidのリスト
           {
                '<借りた人のid>': LendingEntity[],
                ...
           }
        """
        return self.repository.fetch_deadline_lending_list()

    def __repr__(self):
        return f'LendingUseCase("{self.repository}")'
