from datetime import datetime
from sqlalchemy import text

from . import db


class Friend(db.Model):
    __tablename__ = "friends"
    user_id = db.Column(db.String(100), db.ForeignKey("users.id"), primary_key=True)
    friend_id = db.Column(db.String(100), db.ForeignKey("users.id"), primary_key=True)
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

    user = db.relationship("User", foreign_keys=[user_id])
    friend = db.relationship("User", foreign_keys=[friend_id])

    def to_dict(self):
        return dict(
            user_id=self.user_id,
            friend_id=self.friend_id
        )

    def __repr__(self):
        return f"<Friend {self.user_id},{self.friend_id}>"
