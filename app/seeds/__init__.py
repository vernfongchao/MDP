from flask.cli import AppGroup
from .users import seed_users, undo_users
from .roles import seed_roles, undo_roles
from .announcements import seed_announcements, undo_announcements

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_roles()
    seed_users()
    seed_announcements()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_roles()
    undo_users()
    undo_announcements()
    # Add other undo functions here
