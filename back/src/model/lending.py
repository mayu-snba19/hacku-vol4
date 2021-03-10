from datetime import datetime

from sqlalchemy import text
from . import db


class Lending(db.Model):
    __tablename__ = "lendings"
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.String(100), db.ForeignKey("users.id"), nullable=False)
    borrower_id = db.Column(db.String(100), db.ForeignKey("users.id"))
    content = db.Column(db.String(100), nullable=False)
    deadline = db.Column(db.DateTime, nullable=False)
    is_returned = db.Column(db.Boolean, nullable=False, default=False)
    is_confirming_returned = db.Column(db.Boolean, nullable=False, default=False)
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

    owner = db.relationship("User", foreign_keys=[owner_id])
    borrower = db.relationship("User", foreign_keys=[borrower_id])

    def to_dict(self):
        return dict(
            id=self.id,
            owner_id=self.owner_id,
            borrower_id=self.borrower_id,
            content=self.content,
            deadline=self.deadline,
            is_returned=self.is_returned,
            is_confirming_returned=self.is_confirming_returned,
            created_at=self.created_at,
            updated_at=self.updated_at
        )

    def __repr__(self):
        return f"<Leading {self.id}:{self.owner_id},{self.borrower_id},{self.content},{self.deadline}>"
