from datetime import datetime
from typing import List

from src import db
from src.domain.entity.lending_entity import LendingEntity
from src.domain.entity.user_entity import UserEntity
from src.domain.repository.lending_repository import LendingRepository
from src.model import Lending, User


# todo(kondo): エラーハンドリング
class LendingRepositoryImpl(LendingRepository):
    def add_lending(self, owner: UserEntity, content: str, deadline: datetime) -> int:
        fetched_owner = db.session.query(User).filter(User.id == owner.id).first()

        if fetched_owner is None:
            new_user = User()
            new_user.id = owner.id
            new_user.name = owner.name
            new_user.picture_url = owner.picture_url
            new_user.status_message = owner.status_message

            db.session.add(new_user)

        new_lending = Lending()
        new_lending.owner_id = owner.id
        new_lending.content = content
        new_lending.deadline = deadline
        db.session.add(new_lending)

        db.session.flush()
        db.session.commit()

        return new_lending.id

    def associate_borrower(self, lending_id: int, borrower_id: str) -> LendingEntity:
        lending = db.session.query(Lending) \
            .filter(Lending.id == lending_id) \
            .first()
        lending.borrower_id = borrower_id

        db.session.commit()

        associated_lending = db.session.query(
            Lending.content,
            Lending.deadline,
            User.name.label("owner_name")
        ) \
            .join(User, Lending.owner_id == User.id) \
            .filter(Lending.id == lending_id) \
            .first()

        return LendingEntity(
            lending_id,
            associated_lending.content,
            associated_lending.deadline,
            owner_name=associated_lending.borrower_name,
        )

    def fetch_lent_list(self, owner_id: str) -> List[LendingEntity]:
        owner = db.aliased(User)
        borrower = db.aliased(User)

        result = db.session.query(
            Lending.id,
            Lending.content,
            Lending.deadline,
            borrower.name.label('borrower_name')
        ) \
            .join(owner, Lending.owner_id == owner.id) \
            .outerjoin(borrower, Lending.borrower_id == borrower.id) \
            .filter(Lending.owner_id == owner_id) \
            .all()

        lent_list = [
            LendingEntity(
                r.id,
                r.content,
                r.deadline,
                borrower_name=r.borrower_name
            ) for r in result
        ]

        return lent_list

    def fetch_borrowed_list(self, borrower_id: str) -> List[LendingEntity]:
        owner = db.aliased(User)
        borrower = db.aliased(User)

        result = db.session.query(
            Lending.id,
            Lending.content,
            Lending.deadline,
            owner.name.label('owner_name'),
        ) \
            .join(owner, Lending.owner_id == owner.id) \
            .outerjoin(borrower, Lending.borrower_id == borrower.id) \
            .filter(Lending.borrower_id == borrower_id) \
            .all()

        lent_list = [
            LendingEntity(
                r.id,
                r.content,
                r.deadline,
                owner_name=r.owner_name
            ) for r in result
        ]

        return lent_list

    def register_return_lending(self, lending_id: int) -> LendingEntity:
        lending = db.session.query(Lending) \
            .filter(Lending.id == lending_id) \
            .first()
        lending.is_returned = True

        db.session.commit()

        returned_lending = db.session.query(
            Lending.content,
            Lending.deadline,
            User.name.label("borrower_name")
        ) \
            .join(User, Lending.borrower_id == User.id) \
            .filter(Lending.id == lending_id) \
            .first()

        return LendingEntity(
            lending_id,
            returned_lending.content,
            returned_lending.deadline,
            returned_lending.borrower_name
        )
