from .db import db

class Condition(db.Model):
    __tablename__='conditions'
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(),unique=True)
    description = db.Column(db.String())
    type = db.Column(db.String())
    created_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now(), server_onupdate=db.func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'type': self.type
    }