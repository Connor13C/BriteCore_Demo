from db import db


class RequestModel(db.Model):
    __tablename__ = 'request'

    id = db.Column(db.Integer, primary_key=True)
    priority = db.Column(db.Integer)
    target_date = db.Column(db.String(20))
    product_area = db.Column(db.String(20))
    client_name = db.Column(db.String, db.ForeignKey('client.name'))
    client = db.relationship('ClientModel')
    title = db.Column(db.String(80))
    description = db.Column(db.String)

    def __init__(
            self,
            priority,
            target_date,
            product_area,
            client_name,
            title,
            description):
        self.priority = priority
        self.target_date = target_date
        self.product_area = product_area
        self.client_name = client_name
        self.title = title
        self.description = description

    def json(self):
        return {
            'id': self.id,
            'priority': self.priority,
            'target_date': self.target_date,
            'product_area': self.product_area,
            'client_name': self.client_name,
            'title': self.title,
            'description': self.description}

    @classmethod
    def find_all(cls):
        return cls.query.all()

    @classmethod
    def select_by_name(cls, client_name):
        return cls.query.filter_by(client_name=client_name)

    @classmethod
    def select_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def select_same_priority(cls, client_name, priority):
        return cls.query.filter_by(
            client_name=client_name,
            priority=priority).first()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
