from app.models import db, Staff


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = Staff(
        username='demo', email='demo@mdp.io', first_name='Demo', last_name='Lition', password='password', position=2)
    vern = Staff(
        username='vern', email='vern@mdp.io', first_name='Vern', last_name='Chao', password='password', position=1)
    chiew = Staff(
        username='chiew', email='chiew@mdp.io', first_name='Chiew', last_name='Saetern', password='password', position=2)
    lucas = Staff(
        username='lucas', email='lucas@mdp.io', first_name='Lucas', last_name='Costa', password='password', position=3)
    vu = Staff(
        username='vu', email='vu@mdp.io', first_name='Vu', last_name='Co', password='password', position=4)
    george = Staff(
        username='george', email='george@mdp.io', first_name='George', last_name='Eng', password='password', position=5)
    katerina = Staff(
        username='katerina', email='katerina@mdp.io', first_name='Katerina', last_name='Kreibich', password='password', position=5)

    db.session.add(demo)
    db.session.add(vern)
    db.session.add(chiew)
    db.session.add(lucas)
    db.session.add(vu)
    db.session.add(george)
    db.session.add(katerina)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE staffs RESTART IDENTITY CASCADE;')
    db.session.commit()
