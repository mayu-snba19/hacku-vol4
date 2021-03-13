class InvalidArgumentException(Exception):
    def __init__(self, message: str):
        self.message = message

    def __str__(self):
        return f"InvalidArgumentException: {self.message}"


class InvalidOwnerException(Exception):
    def __init__(self):
        pass

    def __str__(self):
        return "InvalidOwnerException"


class BorrowerAlreadyExistsException(Exception):
    def __init__(self):
        pass

    def __str__(self):
        return f"BorrowerAlreadyExistsException"


class AlreadyFriendException(Exception):
    def __init__(self, message: str):
        self.message = message

    def __str__(self):
        return f"AlreadyFriendException: {self.message}"
