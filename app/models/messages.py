from .db import db

class Message(db.Model):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    staff_id = db.Column(db.Integer(), db.ForeignKey('staffs.id'))
    room_id = db.Column(db.Integer(), db.ForeignKey('rooms.id'))
    content = db.Column(db.String(), nullable=False)
    is_edited = db.Column(db.Boolean(), default=False)

    def to_dict(self):
        return {
            'staffId': self.staff_id,
            'roomId': self.room_id,
            'content': self.content,
            'isEdited': self.is_edited
        }
