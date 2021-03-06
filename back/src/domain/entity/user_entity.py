from dataclasses import dataclass, field


@dataclass
class UserEntity:
    """
    ユーザーのエンティティ

    Attributes
    ----------
    id: str
        ユーザーのLINE ID
    name: str
        ユーザー名
    picture_url: str
        アイコン画像のURL
    status_message: str
        ステータスメッセージ
    """
    id: str
    name: str = field(default=None)
    picture_url: str = field(default=None)
    status_message: str = field(default=None)
