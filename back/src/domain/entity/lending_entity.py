import datetime
from dataclasses import dataclass, field


@dataclass
class LendingEntity:
    id: int
    content: str
    deadline: datetime.datetime
    owner_name: str = field(default=None)
    borrower_name: str = field(default=None)
