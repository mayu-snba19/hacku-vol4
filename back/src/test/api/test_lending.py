from src.test import client
from flask import json


def test_register_lending():
    data = json.dumps({"accessToken": "sample1234", "content": "hogefuga", "deadline": "2021/1/1"})
    response = client.post("/api/lending", data=data, content_type='application/json')
    assert response.status_code == 200

