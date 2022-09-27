from app.models import db, Role


# Adds a demo user, you can add other users here if you want
def seed_roles():
  director = Role(position_name='director',)
  doctor = Role(position_name='doctor',)
  nurse = Role(position_name='nurse',)
  surgeon = Role(position_name='surgeon',)
  therapist = Role(position_name='therapist',)
  clerk = Role(position_name='clerk',)



  db.session.add(director)
  db.session.add(doctor)
  db.session.add(nurse)
  db.session.add(surgeon)
  db.session.add(therapist)
  db.session.add(clerk)


  db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_roles():
    db.session.execute('TRUNCATE roles RESTART IDENTITY CASCADE;')
    db.session.commit()
