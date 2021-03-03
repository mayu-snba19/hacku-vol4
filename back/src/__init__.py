from flask import Flask
from flask_cors import CORS

app = Flask("app_name")
app.config.from_object("src.config.BaseConfig")

from src.model import db, migrate


# for health check
@app.route('/health', methods=['GET'])
def health() -> str:
    return '200'


from src.api.test import api as api_test
from src.api.users import api as api_users

app.register_blueprint(api_test, url_prefix="/api")
app.register_blueprint(api_users, url_prefix="/api")
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
