from .db import db, environment, SCHEMA, add_prefix_for_prod

class Role(db.Model):
    __tablename__ = 'roles'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer, primary_key=True)
    position_name = db.Column(db.String(255), nullable=False, unique=True)
    created_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now(), server_onupdate=db.func.now())


    staff = db.relationship('Staff', back_populates='role')

    def to_dict(self):
        return {
            'id': self.id,
            'position_name': self.position_name
        }
