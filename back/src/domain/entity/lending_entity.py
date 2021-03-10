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
    owner_id: str
        貸したユーザーのid
    is_returned: bool
        返却済みかどうか
    is_confirming_returned: bool
        返却確認中かどうか
    """

    id: int
    content: str
    deadline: datetime
    owner_name: str = field(default=None)
    borrower_name: str = field(default=None)
    owner_id: str = field(default=None)
    borrower_id: str = field(default=None)
    is_returned: bool = field(default=False)
    is_confirming_returned: bool = field(default=False)
