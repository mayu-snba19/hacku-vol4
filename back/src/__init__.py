from flask import Flask
from flask_cors import CORS
from typing import Tuple

app = Flask("app_name")
app.config.from_object("src.config.BaseConfig")

from src.model import db, migrate


# for health check
@app.route('/health', methods=['GET'])
def health() -> Tuple[str, int]:
    return '200', 200


# API系
from src.api.lending import api as api_lending
from src.api.bot import api as api_bot
from src.api_mock import api as api_mock

app.register_blueprint(api_lending, url_prefix="/api")
app.register_blueprint(api_mock, url_prefix="/mock")
app.register_blueprint(api_bot, url_prefix="/bot")

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
