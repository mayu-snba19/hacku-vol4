from datetime import datetime
from typing import List

from src.domain.entity import UserEntity, LendingEntity
from src.domain.repository import LendingRepository


class LendingUseCase:
    def __init__(self, repository: LendingRepository):
        self.repository = repository

    def add_lending(self, owner: UserEntity, content: str, deadline: datetime) -> int:
        return self.repository.add_lending(owner, content, deadline)

    def associate_borrower(self, lending_id: int, borrower: UserEntity) -> LendingEntity:
        return self.repository.associate_borrower(lending_id, borrower)

    def fetch_lent_list(self, owner_id: str) -> List[LendingEntity]:
        return self.repository.fetch_lent_list(owner_id)

    def fetch_borrowed_list(self, borrower_id: str) -> List[LendingEntity]:
        return self.repository.fetch_borrowed_list(borrower_id)

    def register_return_lending(self, lending_id: int) -> LendingEntity:
        return self.repository.register_return_lending(lending_id)
