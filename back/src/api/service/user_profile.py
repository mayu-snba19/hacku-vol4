import requests

from src.domain.entity import UserEntity


def get_user_profile(access_token) -> UserEntity:
    """ アクセストークンからプロフィール情報を取得
    Parameters
    ----------
    access_token: str
        アクセストークン

    Returns
    -------
    profile: UserEntity
        ユーザー情報

    """
    url: str = "https://api.line.me/v2/profile"
    headers = {
        "Authorization": f"Bearer {access_token}",
    }
    response = requests.get(url, headers=headers).json()
    profile: UserEntity = UserEntity(response["userId"], response["displayName"], response["pictureUrl"], response["statusMessage"])
    return profile
