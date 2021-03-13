import os

from flask import Flask
from flask_cors import CORS

app = Flask("app_name")
app.config.from_object("src.config.BaseConfig")
if os.environ.get('APP_ENV', '') == 'development':
    app.config['DEBUG'] = True

from src.model import db, migrate


# for health check
@app.route('/health', methods=['GET'])
def health() -> str:
    return '200'


from src.api import api_lending, api_bot, api_friend, api_mock

app.register_blueprint(api_lending, url_prefix="/api")
app.register_blueprint(api_friend, url_prefix="/api")
app.register_blueprint(api_bot, url_prefix="/bot")
app.register_blueprint(api_mock, url_prefix="/mock")

CORS(app)
