from flask_restful import Resource
from models.user import UserModel
from models.parser import Parser


class UserRegister(Resource):
    @staticmethod
    def post():
        parser = Parser()
        parser.required_fields('username', 'password')
        data = parser.parse_args()
        if UserModel.find_by_username(data['username']):
            return {
                'message': f'User with name {data["username"]} already exists'}, 400
        UserModel(**data).save_to_db()
        return {'message': 'User created successfully'}, 201
