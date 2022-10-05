from app.models import db, Staff


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = Staff(
        username='demo', email='demo@mdp.io', first_name='Demo', last_name='Lition', password='password', position=2 ,notes = "")
    vern = Staff(
        username='vern', email='vern@mdp.io', first_name='Vern', last_name='Chao', password='password', position=1, notes="")
    chiew = Staff(
        username='chiew', email='chiew@mdp.io', first_name='Chiew', last_name='Saetern', password='password', position=2, notes="")
    lucas = Staff(
        username='lucas', email='lucas@mdp.io', first_name='Lucas', last_name='Costa', password='password', position=3, notes="")
    vu = Staff(
        username='vu', email='vu@mdp.io', first_name='Vu', last_name='Co', password='password', position=4, notes="")
    george = Staff(
        username='george', email='george@mdp.io', first_name='George', last_name='Eng', password='password', position=5, notes="")
    katerina = Staff(
        username='katerina', email='katerina@mdp.io', first_name='Katerina', last_name='Kreibich', password='password', position=5, notes="")
    marnie = Staff(
        username='marnie', email='marnie@mdp.io', first_name='Marnie', last_name='Lotion', password='password', position=6, notes="")

    db.session.add(demo)
    db.session.add(vern)
    db.session.add(chiew)
    db.session.add(lucas)
    db.session.add(vu)
    db.session.add(george)
    db.session.add(katerina)
    db.session.add(marnie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE staffs RESTART IDENTITY CASCADE;')
    db.session.commit()
