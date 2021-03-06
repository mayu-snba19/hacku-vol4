from abc import ABCMeta, abstractmethod
from datetime import datetime
from typing import List

from src.domain.entity import UserEntity, LendingEntity


class LendingRepository(metaclass=ABCMeta):
    @abstractmethod
    def add_lending(self, owner: UserEntity, content: str, deadline: datetime) -> int:
        pass

    @abstractmethod
    def associate_borrower(self, lending_id: int, borrower: UserEntity) -> LendingEntity:
        pass

    @abstractmethod
    def fetch_lent_list(self, owner_id: str) -> List[LendingEntity]:
        pass

    @abstractmethod
    def fetch_borrowed_list(self, borrower_id: str) -> List[LendingEntity]:
        pass

    @abstractmethod
    def register_return_lending(self, lending_id: int) -> LendingEntity:
        pass
