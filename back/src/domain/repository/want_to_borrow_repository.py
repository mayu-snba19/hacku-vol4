from abc import ABCMeta, abstractmethod

from src.domain.entity import UserEntity


class WantToBorrowRepository(metaclass=ABCMeta):
    @abstractmethod
    def add_want_to_borrow(self, user: UserEntity, content: str) -> int:
        pass

    @abstractmethod
    def fetch_friends_want_to_borrow_list(self, user_id: str) -> dict:
        pass

    @abstractmethod
    def delete_want_to_borrow(self, want_to_borrow_id: int) -> str:
        pass

    @abstractmethod
    def is_valid_user(self, user_id: str, want_to_borrow_id: int) -> bool:
        pass

    def __repr__(self):
        return "WantToBorrow"
