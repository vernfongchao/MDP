from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField
from wtforms.validators import DataRequired,Length


class StaffProfileForm(FlaskForm):
    id = IntegerField('id', validators=[DataRequired("Must be a staff to update")])
    first_name = StringField('first_name', validators=[DataRequired("First name must not be emtpy"),Length(
        min=1,max=255, message="First name must be between 1 and 1000 characters"
    )])
    last_name = StringField('second_name', validators=[DataRequired("Last name must not be empty"),Length(
        min=1,max=255, message="Last name must be between 1 and 1000 characters"
    )])
    position = IntegerField('position_id',validators=[DataRequired("Must have a position")])
    notes = StringField('note', validators=[Length(
       max=5000, message="Notes must be between 1 and 5000 characters")
    ])
