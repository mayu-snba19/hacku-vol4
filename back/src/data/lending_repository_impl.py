from datetime import datetime, timedelta
from typing import List, Tuple
from sqlalchemy import false, true

from src import db
from src.consts.exceptions import BorrowerAlreadyExistsException, InvalidArgumentException
from src.domain.entity import UserEntity, LendingEntity
from src.domain.repository import UserRepository, LendingRepository
from src.domain.use_case import UserUseCase
from src.model import Lending, User


# todo(kondo): エラーハンドリング
class LendingRepositoryImpl(LendingRepository):
    def __init__(self, user_repository: UserRepository):
        self.user_use_case = UserUseCase(user_repository)

    def add_lending(self, owner: UserEntity, content: str, deadline: datetime) -> int:
        fetched_owner = db.session.query(User).filter(User.id == owner.id).first()
        if fetched_owner is None:
            self.user_use_case.add_user(owner)

        new_lending = Lending()
        new_lending.owner_id = owner.id
        new_lending.content = content
        new_lending.deadline = deadline
        db.session.add(new_lending)

        db.session.flush()
        db.session.commit()

        return new_lending.id

    def register_sent_url(self, lending_id: int):
        lending = db.session.query(Lending).filter(Lending.id == lending_id).first()

        if lending is None:
            raise InvalidArgumentException(f"lending(id: {lending_id} does not exist.")

        lending.is_sent_url = True
        db.session.commit()

    def associate_borrower(self, lending_id: int, borrower: UserEntity) -> Tuple[LendingEntity, bool]:
        is_new_user = db.session.query(User).filter(User.id == borrower.id).first() is None
        if is_new_user:
            self.user_use_case.add_user(borrower)

        lending = db.session.query(Lending) \
            .filter(Lending.id == lending_id) \
            .first()

        if lending.borrower_id is not None:
            raise BorrowerAlreadyExistsException()

        lending.borrower_id = borrower.id
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
            owner_name=associated_lending.owner_name,
        ), is_new_user

    def fetch_lent_list(self, owner_id: str) -> List[LendingEntity]:
        result = db.session.query(
            Lending.id,
            Lending.content,
            Lending.deadline,
            User.name.label('borrower_name')
        ) \
            .outerjoin(User, Lending.borrower_id == User.id) \
            .filter(Lending.owner_id == owner_id) \
            .filter(Lending.is_returned == false()) \
            .filter(Lending.is_sent_url == true()) \
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
        result = db.session.query(
            Lending.id,
            Lending.content,
            Lending.deadline,
            User.name.label('owner_name'),
        ) \
            .join(User, Lending.owner_id == User.id) \
            .filter(Lending.is_returned == false()) \
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
            borrower_name=returned_lending.borrower_name
        )

    def is_valid_owner(self, lending_id: int, user_id: str) -> bool:
        lending_owner_id = db.session.query(Lending.owner_id) \
            .filter(Lending.id == lending_id) \
            .first().owner_id

        return lending_owner_id == user_id

    def fetch_deadline_lending_list(self) -> dict:
        today_datetime = datetime(datetime.today().year, datetime.today().month, datetime.today().day)
        tomorrow_datetime = today_datetime + timedelta(days=1)

        lendings = db.session.query(
            Lending.id,
            Lending.owner_id,
            Lending.borrower_id,
            Lending.content,
            Lending.deadline,
            User.name.label("borrower_name")
        ) \
            .join(User, User.id == Lending.borrower_id) \
            .filter(Lending.deadline >= today_datetime) \
            .filter(Lending.deadline < tomorrow_datetime) \
            .filter(Lending.is_returned == false()) \
            .all()

        deadline_lending_list = {}
        for lending in lendings:
            deadline_lending_list.setdefault(lending.owner_id, []).append(
                LendingEntity(
                    lending.id,
                    lending.content,
                    lending.deadline,
                    borrower_name=lending.borrower_name,
                    borrower_id=lending.borrower_id
                )
            )

        return deadline_lending_list

    def fetch_lending(self, lending_id: int) -> LendingEntity:
        lending = db.session.query(
            Lending.id,
            Lending.content,
            Lending.deadline,
            Lending.borrower_id,
            Lending.is_confirming_returned,
            User.name.label('owner_name')
        ) \
            .join(User, Lending.owner_id == User.id) \
            .filter(Lending.id == lending_id) \
            .first()

        return LendingEntity(
            lending.id,
            lending.content,
            lending.deadline,
            owner_name=lending.owner_name,
            borrower_id=lending.borrower_id,
            is_confirming_returned=lending.is_confirming_returned
        )

    def is_confirming_returned(self, lending_id: int) -> bool:
        return db.session.query(Lending.is_confirming_returned) \
            .filter(Lending.id == lending_id) \
            .first() \
            .is_confirming_returned

    def start_confirming_returned(self, lending_id: int):
        lending = db.session.query(Lending) \
            .filter(Lending.id == lending_id) \
            .first()

        lending.is_confirming_returned = True

        db.session.commit()

    def finish_confirming_returned(self, lending_id: int):
        lending = db.session.query(Lending) \
            .filter(Lending.id == lending_id) \
            .first()

        lending.is_confirming_returned = False

        db.session.commit()

    def __repr__(self):
        return f'LendingRepositoryImpl("{self.user_use_case}")'
