from .db import db, environment, SCHEMA, add_prefix_for_prod


class Message(db.Model):
    __tablename__ = 'messages'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}    
    id = db.Column(db.Integer, primary_key=True)
    staff_id = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod('staffs.id')))
    room_id = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod('rooms.id')))
    content = db.Column(db.String(), nullable=False)
    is_edited = db.Column(db.Boolean(), default=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.func.now(), server_onupdate=db.func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'staffId': self.staff_id,
            'roomId': self.room_id,
            'content': self.content,
            'isEdited': self.is_edited,
            'createdAt': self.created_at
        }
