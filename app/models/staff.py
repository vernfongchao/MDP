from app.models import departments
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .departmentstaffs import departmentstaffs
from .staffreports import staffreports


class Staff(db.Model, UserMixin):
    __tablename__ = 'staffs'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    notes= db.Column(db.String(5000))
    hashed_password = db.Column(db.String(255), nullable=False)
    position = db.Column(db.Integer(), db.ForeignKey('roles.id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now(), server_onupdate=db.func.now())


    role = db.relationship('Role', back_populates='staff')
    announcements = db.relationship("Announcement",back_populates="staff", cascade="all,delete")
    image = db.relationship("Image",back_populates="staff", uselist=False, cascade="all,delete" )
    
    departments = db.relationship('Department', secondary=departmentstaffs, backref='staffs')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'userName': self.username,
            'email': self.email,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'position': self.position,
            'notes': self.notes,
            'updateOn': self.updated_at,
            'img':self.image.imageURL if self.image else "",
            'imgId': self.image.id if self.image else ""
        }

    def staff_departments_to_dict(self):
        return [{'departmentId':department.id} for department in self.departments]

    def staff_reports_to_dict(self):
        return[{'reportId':report.id} for report in self.reports]