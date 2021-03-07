from functools import wraps
from flask import request, abort


class AuthError(Exception):
    def __init__(self, error, status_code):
        self.error = error
        self.status_code = status_code


def get_auth():
    return request.headers.get("Authorization", None)


def has_token_auth_header():
    """認証系のエラーハンドリング
    """
    auth = get_auth()
    if not auth:
        raise AuthError({"code": "authorization_header_missing",
                         "description":
                             "Authorization header is expected"}, 401)

    parts = auth.split()

    if parts[0].lower() != "bearer":
        raise AuthError({"code": "invalid_header",
                         "description":
                             "Authorization header must start with"
                             " Bearer"}, 401)
    elif len(parts) == 1:
        raise AuthError({"code": "invalid_header",
                         "description": "Token not found"}, 401)
    elif len(parts) > 2:
        raise AuthError({"code": "invalid_header",
                         "description":
                             "Authorization header must be"
                             " Bearer token"}, 401)


def get_token() -> str:
    """ accessToken を返す
    Returns
    -------
    token: str
        accessToken
    """
    auth = get_auth()
    _, token = auth.split()
    return token


# required_auth デコレーター
def required_auth(f):
    @wraps(f)
    def wrapper(**kwarg):
        try:
            has_token_auth_header()
        except AuthError as e:
            abort(e.status_code, e.error)
        return f(**kwarg)
    return wrapper
