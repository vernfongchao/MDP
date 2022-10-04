from email import message
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length, EqualTo
from app.models import Staff


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = Staff.query.filter(Staff.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = Staff.query.filter(Staff.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired("Username must not be empty."), username_exists, Length(
        min=1, max=40, message="Username must be between 1 and 40 characters"
    )])
    email = StringField('email', validators=[DataRequired(
        "Email must not be empty."), user_exists, Email("Email must be valid."), Length(
            max=255, message="Emails be no longer than 255 characters."
    )])
    first_name = StringField('first_name', validators=[
                             DataRequired("First name must not be empty."), Length(min=1, max=255, message="First name must be between 1 and 255 characters.")])
    last_name = StringField('last_name', validators=[
                            DataRequired("Last name must not be empty."), Length(min=1, max=255, message="Last name must be between 1 and 255 characters.")])
    position = IntegerField('position', validators=[
                            DataRequired("Role must be chosen.")])
    password = StringField('password', validators=[
                           DataRequired("Password must not be empty"),EqualTo("repeat_password",message="Passwords must match"),Length(min=6,message="Passwords must be at least 6 characters long.")])
    repeat_password = StringField('repeat_password', validators=[
        DataRequired("Confirm Password must not be empty.")])
