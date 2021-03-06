from src.domain.entity import UserEntity
from src.domain.repository import UserRepository


class UserUseCase:
    def __init__(self, repository: UserRepository):
        self.repository = repository

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
