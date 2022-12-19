from app.models import Staff
from .db import db


class Room (db.Model):
    __tablename__ = 'rooms'

    id = db.Column(db.Integer, primary_key=True)
    staff_id_1 = db.Column(db.Integer(), db.ForeignKey('staffs.id'))
    staff_id_2 = db.Column(db.Integer(), db.ForeignKey('staffs.id'))
    created_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now(), server_onupdate=db.func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'staffId1': self.staff_id_1,
            'staffId2': self.staff_id_2
        }
