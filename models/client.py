from db import db


class ClientModel(db.Model):
    __tablename__ = 'client'

    name = db.Column(db.String(80), primary_key=True)

    requests = db.relationship('RequestModel', lazy='dynamic')

    def __init__(self, name):
        self.name = name

    def json(self):
        return {'name': self.name, 'requests': [
            request.json() for request in self.requests.all()]}

    @classmethod
    def find_all(cls):
        return cls.query.all()

    @classmethod
    def select(cls, name):
        return cls.query.filter_by(name=name).first()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
