from .db import db, environment, SCHEMA, add_prefix_for_prod


class Room (db.Model):
    __tablename__ = 'rooms'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer, primary_key=True)
    staff_id_1 = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod('staffs.id')))
    staff_id_2 = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod('staffs.id')))
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
