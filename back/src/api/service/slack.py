import json

import requests

from src.consts.service import *


class SlackService:
    webhook_url: str
    channel: str
    icon_url: str

    def __init__(self, webhook_url=slack_webhook_url, channel=slack_channel, icon_url=slack_icon_url):
        self.webhook_url = webhook_url
        self.channel = channel
        self.icon_url = icon_url

    def notify(self, username: str, message: str):
        payload = {
            'text': message,
            'channel': self.channel,
            'username': username,
            'icon_url': self.icon_url
        }

        response = requests.post(
            self.webhook_url,
            data=json.dumps(payload),
            headers={'Content-Type': 'application/json'}
        )

        assert response.status_code == 200
        assert response.text == 'ok'
