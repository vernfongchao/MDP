from email import message
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length


class PostMessageForm(FlaskForm):
    id = IntegerField('id')
    room_id = IntegerField('room_id', validators=[DataRequired(
        "There is not connection between user and current staff")])
    staff_id = IntegerField('staff_id', validators=[
                            DataRequired("Please sign in to send a message")])
    content = StringField('content', validators=[
                          DataRequired("Can not send an empty message")])


class EditMessageForm(FlaskForm):
    id = IntegerField('id',validators=[DataRequired("Message not found")])
    room_id = IntegerField('room_id', validators=[DataRequired(
        "There is not connection between user and current staff")])
    staff_id = IntegerField('staff_id', validators=[
                            DataRequired("Please sign in to send a message")])
    content = StringField('content', validators=[
                          DataRequired("Can not send an empty message")])
