from abc import ABCMeta, abstractmethod
from typing import List

from src.domain.entity import WantToBorrowEntity


class WantToBorrowRepository(metaclass=ABCMeta):
    @abstractmethod
    def add_want_to_borrow(self, user_id: str, content: str) -> int:
        pass

    @abstractmethod
    def fetch_want_to_borrow_list(self, user_id: str) -> dict:
        pass

    @abstractmethod
    def delete_want_to_borrow(self, want_to_borrow_id: int) -> str:
        pass

    def __repr__(self):
        return "WantToBorrow"
