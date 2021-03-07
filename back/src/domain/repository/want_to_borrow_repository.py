from abc import ABCMeta, abstractmethod
from typing import List

from src.domain.entity import WantToBorrowEntity


class WantToBorrowRepository(metaclass=ABCMeta):
    @abstractmethod
    def add_want_to_borrow(self, want_to_borrow: WantToBorrowEntity) -> int:
        pass

    @abstractmethod
    def fetch_want_to_borrow_list(self, user_id: str) -> List[WantToBorrowEntity]:
        pass

    @abstractmethod
    def delete_want_to_borrow(self, want_to_borrow_id: int) -> WantToBorrowEntity:
        pass

    def __repr__(self):
        return "WantToBorrow"
