from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField
from wtforms.validators import DataRequired,ValidationError, Length
from app.models import Announcement

class AnnouncementForm(FlaskForm):
    id = IntegerField("id")
    title = StringField('title', validators=[DataRequired("Please give a title to this announcement."), Length(
        min=1,max=1000, message="Announcement titles must be between 1 and 1000 characters"
    )])
    content = StringField('content', validators=[DataRequired("Please write the content to your announcement"), Length(
        min=1,max=5000, message="Announcements must be between 1 and 5000 characters"
    )])
    staff_id = IntegerField('staff_id',validators=[DataRequired("Must be logged-in to make an announcement.")])
