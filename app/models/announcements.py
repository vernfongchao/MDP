from .db import db, environment, SCHEMA, add_prefix_for_prod

class Announcement(db.Model):
    __tablename__ = 'announcements'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String(100) ,nullable=False)
    content = db.Column(db.String(5000) ,nullable=False)
    staff_id = db.Column(db.Integer(),db.ForeignKey(add_prefix_for_prod('staffs.id')),nullable =False)
    created_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now(), server_onupdate=db.func.now())

    staff = db.relationship('Staff', back_populates="announcements")


    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "content": self.content,
            "staffId": self.staff_id,
            "staffFirstName": self.staff.first_name,
            "staffLastName": self.staff.last_name,
            "staffEmail": self.staff.email
        }
    