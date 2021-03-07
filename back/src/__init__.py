from flask import Flask
from flask_cors import CORS

app = Flask("app_name")
app.config.from_object("src.config.BaseConfig")

from src.model import db, migrate


# for health check
@app.route('/health', methods=['GET'])
def health() -> str:
    return '200'


# 貸出系
from src.api.lending import api as api_lending
from src.api_mock import api as api_mock

app.register_blueprint(api_lending, url_prefix="/api")
app.register_blueprint(api_mock, url_prefix="/mock")

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
