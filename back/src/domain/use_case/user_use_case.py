from src.domain.entity import UserEntity
from src.domain.repository import UserRepository


class UserUseCase:
    def __init__(self, repository: UserRepository):
        self.repository = repository

    # fixme(kondo):
    #  ユーザーのアクセストークンを受け取り、それをLINE Platformへのリクエストに付与して
    #  ユーザーデータを取得するようにする
    def fetch_user(self, user_id: str) -> UserEntity:
        """
        ユーザーを取得する

        Parameters
        ----------
        user_id: str
            ユーザーid
        """
        return self.repository.fetch_user(user_id)

    def add_user(self, new_user: UserEntity):
        """
        ユーザーを追加する

        Parameters
        ----------
        new_user: UserEntity
            追加するユーザー
        """
        self.repository.add_user(new_user)

    def __repr__(self):
        return f'UserUseCase("{self.repository}")'
