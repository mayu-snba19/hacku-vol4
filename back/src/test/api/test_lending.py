from src.test import client
from flask import json


# 正常系
def test_register_lending():
    data = json.dumps({"accessToken": "sample1234", "content": "hogefuga", "deadline": "2021/1/1"})
    response = client.post(
        "/api/lending",
        data=data,
        content_type='application/json',
        headers={"Authorization": "bearer sampleToken"}
    )
    assert response.status_code == 200


def test_register_borrower():
    response = client.put(
        "/api/lending/1",
        headers={"Authorization": "bearer sampleToken"}
    )
    assert response.status_code == 200


def test_get_owner_lending():
    response = client.get(
        "/api/owner/lending",
        headers={"Authorization": "bearer sampleToken"}
    )
    assert response.status_code == 200


def test_get_borrower_lending():
    response = client.get(
        "/api/borrower/lending",
        headers={"Authorization": "bearer sampleToken"}
    )
    assert response.status_code == 200


def test_register_lending_return():
    response = client.delete(
        "/api/lending/1",
        headers={"Authorization": "bearer sampleToken"}
    )
    assert response.status_code == 200

