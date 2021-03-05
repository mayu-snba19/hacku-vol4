"""
貸出機能の処理系
"""


class LendingService:
    def __init__(self, token):
        self.token = token

    def register(self, content: str, deadline: str) -> int:
        """ 貸出情報の登録
        :param content: 貸出内容
        :type deadline: str
        :param deadline: 返却日
        :type deadline: str

        :return: 貸出 ID
        """
        return 1