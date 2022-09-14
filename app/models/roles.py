from .db import db

class Roles(db.Model):
    __tablename__ = 'roles'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)

    staff = db.relationship('Staff', back_populates='roles')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }
