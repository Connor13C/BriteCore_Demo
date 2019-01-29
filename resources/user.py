from flask_restful import Resource
from models.user import UserModel
from models.parser import Parser


class UserRegister(Resource):
    """User registration endpoint for url/register not secure for demo only"""
    @staticmethod
    def post():
        """Post endpoint for registering users into the database.

        Takes params username and password to put into database. Usernames
        cannot be duplicated and will return json message and 400 error if tried.
        On successful user creation will return json message and 201 code"""
        parser = Parser()
        parser.required_fields('username', 'password')
        data = parser.parse_args()
        if UserModel.find_by_username(data['username']):
            return {
                'message': f'User with name {data["username"]} already exists'}, 400
        UserModel(**data).save_to_db()
        return {'message': 'User created successfully'}, 201
