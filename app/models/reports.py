from .db import db, environment, SCHEMA, add_prefix_for_prod
from .staffreports import staffreports
from .patientreports import patientreports
from .departmentreports import departmentreports


class Report(db.Model):
    __tablename__ = 'reports'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.String())
    created_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now(), server_onupdate=db.func.now())

    patients = db.relationship(
        'Patient', secondary=patientreports, backref='reports')
    staffs = db.relationship(
        'Staff', secondary=staffreports, backref='reports')
    departments = db.relationship(
        'Department', secondary=departmentreports, backref='reports')

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "content": self.content,
            'updatedOn': self.updated_at,
        }

    def report_patients_to_dict(self):
        return [{'patientId': patient.id} for patient in self.patients] 

    def report_staffs_to_dict(self):
        return [{'staffId': staff.id} for staff in self.staffs]

    def report_departments_to_dict(self):
        return [{'departmentId': department.id} for department in self.departments]
