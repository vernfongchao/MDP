from flask.cli import AppGroup
from .users import seed_users, undo_users
from .roles import seed_roles, undo_roles
from .patients import seed_patients, undo_patients
from .announcements import seed_announcements, undo_announcements
from .reports import seed_reports,undo_reports
from .departments import seed_deparments,undo_departments
from .departmentstaffs import seed_departmentstaffs, undo_departmentstaffs
from .emergecy_contacts import seed_emergency_contacts, undo_emergency_contacts

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_roles()
    seed_users()
    seed_patients()
    seed_announcements()
    seed_reports()
    seed_deparments()
    seed_departmentstaffs()
    seed_emergency_contacts()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_roles()
    undo_users()
    undo_patients()
    undo_announcements()
    undo_reports()
    undo_departments()
    undo_departmentstaffs()
    undo_emergency_contacts()
    # Add other undo functions here
