from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Staff


def user_exists(form, field):
    # Checking if user exists
    username = field.data
    user = Staff.query.filter(Staff.username == username).first()
    if not user:
        raise ValidationError('Username provided not found.')


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    username = form.data['username']
    user = Staff.query.filter(Staff.username == username).first()
    if not user:
        raise ValidationError('Please re-enter your username.')
    if not user.check_password(password):
        raise ValidationError('Password was incorrect.')


class LoginForm(FlaskForm):
    username = StringField('username', validators=[DataRequired("Username must not be empty."), user_exists])
    password = StringField('password', validators=[DataRequired(
        "Password must not be empty."), password_matches])
