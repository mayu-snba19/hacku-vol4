from sqlalchemy.sql.functions import current_timestamp
from . import db


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    created_at = db.Column(
        db.TIMESTAMP,
        server_default=current_timestamp(),
        default=current_timestamp(),
        nullable=False
    )

    def to_dict(self):
        return dict(
            id=self.id,
            name=self.name,
            created_at=self.created_at
        )

    def __repr__(self):
        return f'<User {self.id}:{self.name},{self.created_at}>'
