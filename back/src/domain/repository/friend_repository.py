from abc import ABCMeta, abstractmethod


class FriendRepository(metaclass=ABCMeta):
    @abstractmethod
    def register_friend(self, user_id_1: str, user_id_2: str) -> [str, str]:
        pass

    @abstractmethod
    def unregister_friend(self, user_id_1: str, user_id_2: str) -> [str, str]:
        pass

    def __repr__(self):
        return "FriendRepository"
