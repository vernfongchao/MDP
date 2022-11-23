from .db import db, environment, SCHEMA, add_prefix_for_prod


class Image(db.Model):
    __tablename__ = 'images'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}    
    id = db.Column(db.Integer(), primary_key=True)
    imageURL = db.Column(db.String())
    staff_id = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod('staffs.id')))
    patient_id = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod('patients.id')))
    created_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now(), server_onupdate=db.func.now())


    staff = db.relationship('Staff', back_populates="image")
    patient = db.relationship('Patient', back_populates="image")
