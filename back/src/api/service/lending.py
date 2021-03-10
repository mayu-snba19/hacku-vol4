from typing import Tuple, List
from datetime import datetime

from src.api.service.user_profile import get_user_profile
from src.consts.exceptions import InvalidOwnerException

from src.domain.use_case import *
from src.data import *
from src.domain.entity import *


class LendingService:
    """ 貸出機能の処理系
    """

    def __init__(self, token):
        self.token = token
        self.LendingUseCase = LendingUseCase(LendingRepositoryImpl(UserRepositoryImpl()))

    def register_lending(self, content: str, deadline: datetime) -> Tuple[int, datetime]:
        """ 貸出情報の登録
        Parameters
        ----------
        content: str
            貸出内容
        deadline: datetime
            返却日

        Returns
        -------
        lending_id: int
            貸出ID
        created_at: str
            登録時間
        """
        profile: UserEntity = get_user_profile(access_token=self.token)
        lending_id: int = self.LendingUseCase.add_lending(profile, content, deadline)
        return lending_id, deadline

    def register_borrower(self, lending_id: int) -> LendingEntity:
        """ 借りた人の登録
        Parameters
        ----------
        lending_id: int
            貸出ID

        Returns
        -------
        lending_info: LendingEntity
            貸出情報
        """
        profile: UserEntity = get_user_profile(access_token=self.token)
        lending_info: LendingEntity = self.LendingUseCase.associate_borrower(lending_id, profile)
        return lending_info

    def get_owner_lending(self) -> List[LendingEntity]:
        """ 貸したもの一覧
        Returns
        -------
        lending_list: list
            lending_id: str
                貸出ID
            content: str
                貸出内容
            deadline: datetime
                返却日
            borrower_name: str
                借りた人の名前
        """
        profile: UserEntity = get_user_profile(access_token=self.token)
        lending_list: List[LendingEntity] = self.LendingUseCase.fetch_lent_list(profile.id)
        return lending_list

    def get_borrower_lending(self) -> List[LendingEntity]:
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
           owner_name: str
               借りた人の名前
       """
        user = get_user_profile(self.token)
        borrowed_list = self.LendingUseCase.fetch_borrowed_list(user.id)

        return borrowed_list

    def register_lending_return(self, lending_id: int) -> LendingEntity:
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

        return returned_lending
