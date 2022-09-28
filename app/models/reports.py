from .db import db
from .staffreports import staffreports
from .patientreports import patientreports
from .departmentreports import departmentreports


class Report(db.Model):
    __tablename__ = 'reports'

    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String(1000), nullable=False)
    content = db.Column(db.String())
    created_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now(), server_onupdate=db.func.now())


    patients = db.relationship(
        'Patient', secondary=patientreports, backref='reports')
    staff = db.relationship(
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
