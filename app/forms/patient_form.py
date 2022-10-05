from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length


class EditPatientForm(FlaskForm):
    id = IntegerField('id', validators=[
                      DataRequired("No patient to update")])
    first_name = StringField('first_name', validators=[DataRequired("First name must not be emtpy"), Length(
        min=1, max=255, message="First name must be between 1 and 255 characters"
    )])
    last_name = StringField('last_name', validators=[DataRequired("Last name must not be empty"), Length(
        min=1, max=255, message="Last name must be between 1 and 255 characters"
    )])
    address = StringField('address', validators=[DataRequired("Address must not be empty"), Length(
        min=1, max=500, message="Address must be between 1 and 500 characters"
    )])
    notes = StringField('note', validators=[Length(
        max=5000, message="Notes must be no longer than 5000 characters")
    ])


class AddPatientForm(FlaskForm):
    first_name = StringField('first_name', validators=[DataRequired("First name must not be emtpy"), Length(
        min=1, max=255, message="First name must be between 1 and 255 characters"
    )])
    last_name = StringField('last_name', validators=[DataRequired("Last name must not be empty"), Length(
        min=1, max=255, message="Last name must be between 1 and 255 characters"
    )])
    address = StringField('address', validators=[DataRequired("Address must not be empty"), Length(
        min=1, max=500, message="Address must be between 1 and 500 characters"
    )])
    notes = StringField('note', validators=[Length(
        max=5000, message="Notes must be no longer than 5000 characters")
    ])
