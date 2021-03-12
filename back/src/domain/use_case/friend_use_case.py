from src.domain.repository import FriendRepository
from src.domain.entity import UserEntity


class FriendUseCase:
    def __init__(self, repository: FriendRepository):
        self.repository = repository

    def register_friend(self, user_1: UserEntity, user_2: UserEntity) -> [str, str]:
        """
        フレンド登録をする

        Parameters
        ----------
        user_1: UserEntity
            ユーザー2とフレンド登録されるユーザー1
        user_2: UserEntity
            ユーザー1とフレンド登録されるユーザー2

        Returns
        -------
        user_1_name, user_2_name: [str, str]
            フレンド登録された2つのユーザー名

        Raises
        ------
        AlreadyFriendException
            既に2人のユーザーがフレンドだった場合に例外を投げる
        """
        return self.repository.register_friend(user_1, user_2)

    def unregister_friend(self, user_id_1: str, user_id_2: str) -> [str, str]:
        """
        フレンド登録を解除する

        Parameters
        ----------
        user_id_1: str
            ユーザー2とのフレンド登録を解除されるユーザー1のid
        user_id_2: str
            ユーザー1とのフレンド登録を解除されるユーザー2のid

        Returns
        -------
        user_1_name, user_2_name: [str, str]
            フレンド登録解除された2つのユーザー名

        Raises
        ------
        InvalidArgumentException
            user_id_1, user_id_2の組み合わせのフレンド登録がなかった場合、例外を投げる
        """
        return self.repository.unregister_friend(user_id_1, user_id_2)

    def __repr__(self):
        return f'FriendUseCase("{self.repository}")'
