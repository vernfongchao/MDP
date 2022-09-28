from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length

class ReportForm(FlaskForm):
    id = IntegerField("id")
    title = StringField('title', validators=[DataRequired("Please give a title this report."), Length(
        min=1, max=1000, message="Announcement titles must be between 1 and 1000 characters"
    )])
    content = StringField('content')
