from app.models import db,Room

def seed_rooms():
    rooms = [
        Room(),
    ]

    db.session.add_all(rooms)
    db.session.commit()

def undo_rooms():
    db.session.execute('TRUNCATE rooms RESTART IDENTITY CASCADE;')
    db.session.commit()
