from .db import db

class Image(db.Model):
    __tablename__= 'images'
    id = db.Column(db.Integer(), primary_key=True)
    imageURL = db.Column(db.String())
    staff_id = db.Column(db.Integer(),db.ForeignKey('staffs.id'))
    patient_id = db.Column(db.Integer(),db.ForeignKey('patients.id'))

    staff = db.relationship('Staff', back_populates="image")
    patient = db.relationship('Patient', back_populates="image")