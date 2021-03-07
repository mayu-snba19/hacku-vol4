from src import app
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy(app)
migrate = Migrate(app, db)

from .user import User
from .lending import Lending
from .friend import Friend
from .want_to_borrow import WantToBorrow

__all__ = [
    User,
    Lending,
    Friend,
    WantToBorrow
]
