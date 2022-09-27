from .db import db
from .departmentstaffs import departmentstaffs


class Patient(db.Model):
    __tablename__ = 'patients'
    id = db.Column(db.Integer(), primary_key=True)
    first_name = db.Column(db.String(255), nullable=False, unique=True)
    last_name = db.Column(db.String(255), nullable=False, unique=True)
    last_name = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(500), nullable=False)
    notes = db.Column(db.String(5000))
    emergency_contact_name = db.Column(db.String(500))
    emergency_contact_phone = db.Column(db.String(15))

    image = db.relationship("Image", back_populates="patient",
                            uselist=False, cascade="all,delete")
    # departments = db.relationship(
    #     'Department', secondary=departmentstaffs, backref='patients')

    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'address': self.address,
            'notes': self.notes,
            'emergencyContactName': self.emergency_contact_name,
            'emergencyContactPhone': self.emergency_contact_phone,
            'img': self.image.imageURL if self.image else "",
            'imgId': self.image.id if self.image else ""
        }

    # def to_departmentpatients_dict(self):
    #     return [{'departmentId': department.id} for department in self.departments]
