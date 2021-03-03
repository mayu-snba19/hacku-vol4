from src import app
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy(app)
migrate = Migrate(app, db)


from .user import User


__all__ = [
    User,
]