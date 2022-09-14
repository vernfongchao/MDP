from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class Staff(db.Model, Userixin):
    __tablename__ = 'staffs'

    id = db.Column(db.Integer, primary_key=True)
    userName = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    firstName = db.Column(db.String(255), nullable=False, unique=True)
    lastName = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    position = db.Column(db.Integer(), db.ForeignKey('roles.id'), nullable=False)

    role = db.relationship('Role', back_populates='staffs')

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
            'userName': self.userName,
            'email': self.email,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'position': self.position
        }
