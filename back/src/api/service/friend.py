from typing import Tuple

from src.domain.entity import UserEntity
from src.domain.use_case import FriendUseCase, UserUseCase
from src.data import FriendRepositoryImpl, UserRepositoryImpl
from .user_profile import get_user_profile
from .auth import get_token


class FriendService:
    """ フレンドの処理系
    """
    payload: dict
    user: UserEntity
    user_use_case: UserUseCase
    friend_use_case: FriendUseCase

    def __init__(self, payload: dict):
        """
        Parameters
        ----------
        payload: dict
            リクエストのペイロード
        """
        self.payload = payload
        self.user = get_user_profile(get_token())
        self.user_use_case = UserUseCase(UserRepositoryImpl())
        self.friend_use_case = FriendUseCase(FriendRepositoryImpl(UserRepositoryImpl()))

    def register_friend(self) -> Tuple[str, str]:
        """
        フレンドの登録

        Returns
        -------
        user_name, friend_name: Tuple[str, str]
            フレンド登録されたユーザー(self.userと、friend_idのユーザー)の名前

        Raises
        ------
        AlreadyFriendException
            既に2人のユーザーがフレンドだった場合に例外を投げる
        """
        friend_id: str = self.payload.get('friend_id')
        # note(kondo): friend_idのユーザーは既にDBに登録されている前提
        friend = self.user_use_case.fetch_user(friend_id)

        user_name, friend_name = self.friend_use_case.register_friend(self.user, friend)

        return user_name, friend_name

    def unregister_friend(self):
        """
        フレンドの登録解除

        Returns
        -------
        user_name, friend_name: Tuple[str, str]
            フレンド登録解除されたユーザー(self.userと、friend_idのユーザー)の名前

        Raises
        ------
        InvalidArgumentException
            user_id_1, user_id_2の組み合わせのフレンド登録がなかった場合、例外を投げる
        """
        friend_id: str = self.payload.get('friend_id')
        user_name, friend_name = self.friend_use_case.unregister_friend(self.user.id, friend_id)

        return user_name, friend_name
