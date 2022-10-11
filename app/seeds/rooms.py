from app.models import db,Room

def seed_rooms():
    rooms = [
        Room(staff_id_1=2,staff_id_2=1),
        Room(staff_id_1=1, staff_id_2=3),
        Room(staff_id_1=1, staff_id_2=4),
    ]

    db.session.add_all(rooms)
    db.session.commit()

def undo_rooms():
    db.session.execute('TRUNCATE rooms RESTART IDENTITY CASCADE;')
    db.session.commit()
