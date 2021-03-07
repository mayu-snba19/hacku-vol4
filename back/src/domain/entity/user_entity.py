from dataclasses import dataclass, field


@dataclass
class UserEntity:
    id: str
    name: str = field(default=None)
    picture_url: str = field(default=None)
    status_message: str = field(default=None)
