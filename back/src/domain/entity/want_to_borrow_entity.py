from dataclasses import dataclass


@dataclass
class WantToBorrowEntity:
    """
    借りたいもののエンティティ

    Attributes
    ----------
    id: int
        借りたいもののid
    user_id: str
        この借りたいものを登録したユーザーのid
    content: str
        借りたいものの内容
    """
    id: int
    user_id: str
    content: str
