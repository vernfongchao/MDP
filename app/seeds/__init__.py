from flask.cli import AppGroup
from .users import seed_users, undo_users
from .roles import seed_roles, undo_roles
from .patients import seed_patients, undo_patients
from .announcements import seed_announcements, undo_announcements
from .reports import seed_reports,undo_reports
from .departments import seed_deparments,undo_departments
from .departmentstaffs import seed_departmentstaffs, undo_departmentstaffs
from .emergecy_contacts import seed_emergency_contacts, undo_emergency_contacts
from .patient_reports import seed_patientreports,undo_patientreports
from .staff_reports import seed_staff_reports,undo_staff_reports
from .department_reports import seed_department_reports, undo_department_reports
from .rooms import seed_rooms,undo_rooms
from .messages import seed_messages,undo_messages
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
    seed_patientreports()
    seed_staff_reports()
    seed_department_reports()
    seed_rooms()
    seed_messages()
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
    undo_patientreports()
    undo_staff_reports()
    undo_department_reports()
    undo_rooms()
    undo_messages()
    # Add other undo functions here
