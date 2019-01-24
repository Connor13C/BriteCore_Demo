from flask_restful import Resource
from flask import render_template, Response


class Login(Resource):
    @staticmethod
    def get():
        return Response(render_template('login.html'), mimetype='text/html')
