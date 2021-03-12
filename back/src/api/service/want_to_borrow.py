from src.domain.use_case import *

from src.api.service.user_profile import get_user_profile
from src.domain.entity import *
from src.data import *


class WantToBorrowService:
    def __init__(self, token):
        self.token: str = token
        self.WantToBorrowUseCase = WantToBorrowUseCase(WantToBorrowRepositoryImpl(UserRepositoryImpl()))

    def get_want_to_borrow_list(self) -> dict:
        profile: UserEntity = get_user_profile(self.token)
        wtb_list: dict = dict(self.WantToBorrowUseCase.fetch_friends_want_to_borrow_list(profile.id))
        return wtb_list

    def post_want_to_borrow(self, content: str) -> int:
        profile: UserEntity = get_user_profile(self.token)
        want_to_borrow_id: int = self.WantToBorrowUseCase.add_want_to_borrow(profile, content)
        return want_to_borrow_id

    def delete_want_to_borrow(self, want_to_borrow_id: int) -> str:
        content: str = self.WantToBorrowUseCase.delete_want_to_borrow(want_to_borrow_id)
        return content
