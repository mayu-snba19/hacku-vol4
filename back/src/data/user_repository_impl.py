from src import db
from src.consts.exceptions import InvalidArgumentException
from src.domain.entity import UserEntity
from src.domain.repository import UserRepository
from src.model import User


class UserRepositoryImpl(UserRepository):
    def fetch_user(self, user_id: str) -> UserEntity:
        user = db.session.query(User).filter(User.id == user_id).first()

        if user is None:
            raise InvalidArgumentException(f"user: {user_id} does not exist.")

        return UserEntity(user.id, user.name, user.picture_url, user.status_message)

    def add_user(self, user: UserEntity):
        new_user = User()
        new_user.id = user.id
        new_user.name = user.name
        new_user.picture_url = user.picture_url
        new_user.status_message = user.status_message

        db.session.add(new_user)
        db.session.commit()

    def __repr__(self):
        return f'UserRepositoryImpl'
