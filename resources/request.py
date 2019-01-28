from flask_restful import Resource
from flask_jwt import jwt_required
from models.request import RequestModel
from models.client import ClientModel
from models.parser import Parser


class Request(Resource):

    @jwt_required()
    def post(self):
        parser = Parser()
        parser.required_fields(
            'priority',
            'target_date',
            'product_area',
            'client_name',
            'title',
            'description')
        data = parser.parse_args()
        if not ClientModel.select(data['client_name']):
            return {
                'message': f'Client with name {data["client_name"]} does not exist'}, 400
        request = RequestModel(**data)
        client_name = data['client_name']
        priority = data['priority']
        update_list = []
        try:
            while RequestModel.select_same_priority(client_name, priority):
                update_list.append(
                    RequestModel.select_same_priority(
                        client_name, priority))
                priority += 1
            request.save_to_db()
            for req in update_list:
                req.priority += 1
                req.save_to_db()
        except BaseException:
            return {'message': 'Something went wrong'}, 500
        return request.json(), 201


class RequestID(Resource):

    @jwt_required()
    def get(self, request_id):
        request = RequestModel.select_by_id(request_id)
        if request:
            return request.json(), 200
        return {'message': 'Request not found'}, 404

    @jwt_required()
    def delete(self, request_id):
        request = RequestModel.select_by_id(request_id)
        if request:
            request.delete_from_db()
            return {'message': 'Request deleted'}, 200
        return {'message': 'Request not found'}, 404


class RequestList(Resource):
    @jwt_required()
    def get(self):
        return {'requests': [request.json()
                             for request in RequestModel.find_all()]}, 200
