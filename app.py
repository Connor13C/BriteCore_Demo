import os
import datetime

from flask import Flask
from flask_restful import Api
from flask_jwt import JWT

from security import authenticate, identity
from resources.navigation import Login
from resources.user import UserRegister
from resources.client import Client, ClientList
from resources.request import Request, RequestList

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    'DATABASE_URL', 'sqlite:///data.db')
app.config['PROPAGATE_EXCEPTIONS'] = True
app.config['JWT_EXPIRATION_DELTA'] = datetime.timedelta(hours=1)
app.secret_key = 'britecore'
api = Api(app)

jwt = JWT(app, authenticate, identity)

api.add_resource(Login, '/')
api.add_resource(UserRegister, '/register')
api.add_resource(Client, '/client/<string:name>')
api.add_resource(ClientList, '/clients')
api.add_resource(Request, '/request')
api.add_resource(RequestList, '/requests')


if __name__ == '__main__':
    from db import db
    db.init_app(app)

    @app.before_first_request
    def create_tables():
        db.create_all()

    app.run(port=8080, threaded=True)
