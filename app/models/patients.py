from .db import db
from .patientreports import patientreports


class Patient(db.Model):
    __tablename__ = 'patients'
    id = db.Column(db.Integer(), primary_key=True)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(500), nullable=False)
    notes = db.Column(db.String(5000))
    created_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now(), server_onupdate=db.func.now())

    image = db.relationship("Image", back_populates="patient",
                            uselist=False, cascade="all,delete")
    contact = db.relationship("EmergencyContact", back_populates="patient",
                              uselist=False, cascade="all,delete")

    # reports = db.relationship('Report',secondary )

    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'address': self.address,
            'notes': self.notes,
            'img': self.image.imageURL if self.image else "",
            'imgId': self.image.id if self.image else "",
            'updatedOn': self.updated_at
        }

    def patient_reports_to_dict(self):
        return [{"reportId": report.id} for report in self.reports]
