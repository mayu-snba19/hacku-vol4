from .bot import api as api_bot
from .lending import api as api_lending
from .friend import api as api_friend
from .want_to_borrow import api as api_want_to_borrow
from .mock import api as api_mock

__all__ = [
    "api_bot",
    "api_lending",
    "api_friend",
    "api_want_to_borrow",
    "api_mock"
]
