from datetime import datetime

from sqlalchemy import text
from . import db


class WantToBorrow(db.Model):
    __tablename__ = "want_to_borrows"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(100), db.ForeignKey("users.id"), nullable=False)
    content = db.Column(db.String(100), nullable=False)
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

    def to_dict(self):
        return dict(
            id=self.id,
            user_id=self.user_id,
            content=self.content
        )

    def __repr__(self):
        return f"<WantToBorrow {self.id}:{self.user_id},{self.content}>"
