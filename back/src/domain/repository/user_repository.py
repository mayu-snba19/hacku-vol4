from abc import ABCMeta, abstractmethod

from src.domain.entity import UserEntity


class UserRepository(metaclass=ABCMeta):
    @abstractmethod
    def fetch_user(self, user_id: str) -> UserEntity:
        pass

    @abstractmethod
    def add_user(self, new_user: UserEntity):
        pass

    def __repr__(self):
        return "UserRepository"
