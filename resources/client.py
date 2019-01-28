from flask_restful import Resource
from flask_jwt import jwt_required
from models.client import ClientModel


class Client(Resource):
    @jwt_required()
    def get(self, name):
        client = ClientModel.select(name)
        if client:
            return client.json()
        return {'message': 'Client not found'}, 404

    @jwt_required()
    def post(self, name):
        if ClientModel.select(name):
            return {'message': f'Client named {name} already exists'}, 400
        client = ClientModel(name)
        try:
            client.save_to_db()
        except BaseException:
            return {'message': 'Something went wrong'}, 500
        return client.json(), 201

    @jwt_required()
    def delete(self, name):
        client = ClientModel.select(name)
        if client:
            client.delete_from_db()
            return {'message': 'Client deleted'}
        return {'message': 'Client not found'}


class ClientList(Resource):
    @jwt_required()
    def get(self):
        return {'clients': [client.name
                            for client in ClientModel.find_all()]}
