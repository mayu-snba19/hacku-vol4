from datetime import datetime
from dataclasses import dataclass, field


@dataclass
class LendingEntity:
    """
    貸借りのエンティティ

    Attributes
    ----------
    id: int
        貸借りid
    content: str
        貸したもの
    deadline: datetime
        貸借り期限
    owner_name: str
        貸したユーザーの名前
    borrower_name: str
        借りたユーザーの名前
    """
    
    id: int
    content: str
    deadline: datetime
    owner_name: str = field(default=None)
    borrower_name: str = field(default=None)
