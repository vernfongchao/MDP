from .db import db

class Patient(db.Model):
    __tablename__='patients'
    id = db.Column(db.Integer(), primary_key=True)
    first_name = db.Column(db.String(255), nullable=False, unique=True)
    last_name = db.Column(db.String(255), nullable=False, unique=True)
    last_name = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(500), nullable=False)
    notes= db.Column(db.String(5000))
    emergency_contact_name = db.Column(db.String(500))
    emergency_contact_phone = db.Column(db.String(15))

    image = db.relationship("Image",back_populates="patient", uselist=False, cascade="all,delete" )
    