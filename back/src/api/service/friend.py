from src.domain.entity import UserEntity
from src.domain.use_case import FriendUseCase
from src.data import FriendRepositoryImpl
from . import get_user_profile


class FriendService:
    """ フレンドの処理系
    """
    user: UserEntity
    friend_use_case: FriendUseCase

    def __init__(self, token: str):
        """
        Parameters
        ----------
        token: str
            フロントエンドから受け取ったLINEのアクセストークン
        """
        self.user = get_user_profile(token)
        self.friend_use_case = FriendUseCase(FriendRepositoryImpl())
