from src import app

# テストクライアントの定義
app.config["TESTING"] = True
client = app.test_client()
