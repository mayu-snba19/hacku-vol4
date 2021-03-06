from src import db
from src.domain.entity import UserEntity
from src.domain.repository.user_repository import UserRepository
from src.model import User


class UserRepositoryImpl(UserRepository):
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
