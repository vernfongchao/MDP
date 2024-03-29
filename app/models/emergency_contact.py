from .db import db

class EmergencyContact(db.Model):
    __tablename__= 'emergencycontacts'

    id = db.Column(db.Integer(), primary_key=True)
    first_name = db.Column(db.String(255))
    last_name = db.Column(db.String(255))
    phone = db.Column(db.String(10))
    patient_id = db.Column(db.Integer(), db.ForeignKey('patients.id'))

    patient = db.relationship('Patient', back_populates="contact")

    def to_dict(self):
        return{
            'id':self.id,
            'firstName':self.first_name,
            'lastName':self.last_name,
            'phone': self.phone,
            'patientId':self.patient_id
        }
