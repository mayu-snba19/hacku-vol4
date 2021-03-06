class LendingService:
    """
    貸出機能の処理系
    """

    def __init__(self, token):
        self.token = token

    def register(self, content: str, deadline: str) -> (int, str):
        """ 貸出情報の登録
        :param content: 貸出内容
        :type deadline: str
        :param deadline: 返却日
        :type deadline: str

        :return: 貸出ID, created_at
        """
        return 1, "2020/1/1"
