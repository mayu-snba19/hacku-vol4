class InvalidOwnerException(Exception):
    def __init__(self):
        pass

    def __str__(self):
        return "InvalidOwnerException"


class InvalidArgumentException(Exception):
    def __init__(self, message):
        self.message = message

    def __str__(self):
        return f"InvalidArgumentException: {self.message}"
