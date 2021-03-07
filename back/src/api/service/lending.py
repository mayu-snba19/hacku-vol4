from typing import Tuple
from datetime import datetime

from src.api.service.user_profile import get_user_profile
from src.consts.exceptions import InvalidOwnerException

from src.domain.use_case import *
from src.data import *


class LendingService:
    """ 貸出機能の処理系
    """

    def __init__(self, token):
        self.token = token
        self.LendingUseCase = LendingUseCase(LendingRepositoryImpl(UserRepositoryImpl()))

    def register_lending(self, content: str, deadline: str) -> Tuple[int, str]:
        """ 貸出情報の登録
        Parameters
        ----------
        content: str
            貸出内容
        deadline: datetime
            返却日

        Returns
        -------
        lendingId: int
            貸出ID
        created_at: str
            登録時間
        """
        get_user_profile(access_token=self.token)

        return 1, "2020/1/1"

    def register_borrower(self, lending_id: int) -> Tuple[str, str, str]:
        """ 借りた人の登録
        Parameters
        ----------
        lending_id: int
            貸出ID

        Returns
        -------
        content: str
            貸出内容
        deadline: datetime
            返却日
        ownerName: str
            貸した人の名前
        """
        return "貸出内容", "返却日", "貸した人の名前"

    def get_owner_lending(self) -> list:
        """ 貸したもの一覧
        Returns
        -------
        lendingList: list
            lendingId: str
                貸出ID
            content: str
                貸出内容
            deadline: datetime
                返却日
            borrowerName: str
                借りた人の名前
        """
        return [{
            'lendingId': "貸出id",
            'content': "貸したもの",
            'deadline': "期限",
            'borrowerName': "借りた人の名前"
        }]

    def get_borrower_lending(self) -> list:
        """ 借りたもの一覧
       Returns
       -------
       lendingList: list
           lendingId: str
               貸出ID
           content: str
               貸出内容
           deadline: datetime
               返却日
           borrowerName: str
               借りた人の名前
       """
        user = get_user_profile(self.token)
        borrowed_list = self.LendingUseCase.fetch_borrowed_list(user.id)

        return [
            {
                "lendingId": lending.id,
                "content": lending.content,
                "deadline": lending.deadline,
                "borrowerName": lending.borrower_name
            }
            for lending in borrowed_list
        ]

    def register_lending_return(self, lending_id: int):
        """ 返却報告
        Parameters
        ----------
        lending_id: int
            貸出ID

        Returns
        -------
        content: str
            貸出内容
        deadline: datetime
            返却日
        ownerName: str
            借りた人の名前

        Raises
        ------
        InvalidOwnerException
            正当な返却者でなければエラーを投げる
        """
        user = get_user_profile(self.token)
        is_valid_owner = self.LendingUseCase.is_valid_owner(lending_id, user.id)

        if not is_valid_owner:
            raise InvalidOwnerException

        returned_lending = self.LendingUseCase.register_return_lending(lending_id)

        return returned_lending.content, returned_lending.deadline, returned_lending.borrower_name
