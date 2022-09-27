from .db import db


class Department(db.Model):
    __tablename__ = 'departments'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    building = db.Column(db.String(100), nullable=False)
    floor = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now(), server_onupdate=db.func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'building': self.building,
            'floor': self.floor

        }

    def to_departmentstaffs_dict(self):
        return [{'staffId': staff.id} for staff in self.staffs]
