from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class StaffProfileForm(FlaskForm):
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('second_name', validators=[DataRequired()])
    notes = StringField('note')