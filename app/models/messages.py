from .db import db


class Message(db.Model):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    staff_id = db.Column(db.Integer(), db.ForeignKey('staffs.id'))
    room_id = db.Column(db.Integer(), db.ForeignKey('rooms.id'))
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
            'isEdited': self.is_edited
        }
