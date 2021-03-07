from datetime import datetime

from sqlalchemy import text
from . import db


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(100), primary_key=True)
    name = db.Column(db.String(100))
    picture_url = db.Column(db.String(200))
    status_message = db.Column(db.String(200))
    created_at = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.now,
        server_default=text("CURRENT_TIMESTAMP"),
    )
    updated_at = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.now,
        server_default=text("CURRENT_TIMESTAMP"),
        onupdate=datetime.now,
        server_onupdate=text("CURRENT_TIMESTAMP"),
    )

    def to_dict(self):
        return dict(
            id=self.id,
            name=self.name,
            picture_url=self.picture_url,
            status_message=self.status_message,
            created_at=self.created_at,
            updated_at=self.updated_at
        )

    def __repr__(self):
        return f"<User {self.id}:{self.name},{self.created_at}>"
