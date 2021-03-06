from datetime import datetime
from typing import List

from src.domain.entity.lending_entity import LendingEntity
from src.domain.repository.lending_repository import LendingRepository


class LendingUseCase():
    def __init__(self, repository: LendingRepository):
        self.repository = repository

    def add_lending(self, owner_id: str, content: str, deadline: datetime) -> int:
        return self.repository.add_lending(owner_id, content, deadline)

    def associate_borrower(self, lending_id: int, borrower_id: str) -> LendingEntity:
        return self.repository.associate_borrower(lending_id, borrower_id)

    def fetch_lent_list(self, owner_id: str) -> List[LendingEntity]:
        return self.repository.fetch_lent_list(owner_id)

    def fetch_borrowed_list(self, borrower_id: str) -> List[LendingEntity]:
        return self.repository.fetch_borrowed_list(borrower_id)

    def register_return_lending(self, lending_id: int) -> LendingEntity:
        return self.repository.register_return_lending(lending_id)
