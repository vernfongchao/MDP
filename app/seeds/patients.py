from app.models import db, Patient


def seed_patients():
    patients = [
        Patient(first_name='Eddie', last_name='Marshall', address='Mirror Park Blvd', notes=''),
        Patient(first_name='Mary', last_name='Mushkin', address='North Rockford Drive', notes=''),
        Patient(first_name='Ramee', last_name='El-Rahman', address='Vespucci Blvd', notes=''),
        Patient(first_name='Randy', last_name='Bullet', address='Vespucci Blvd', notes=''),
        Patient(first_name='Michael', last_name='Simone', address='Magellan', notes=''),
        Patient(first_name='Nicholas', last_name='Simone', address='Magellan', notes=''),
        Patient(first_name='Jim', last_name='Underwood', address='San Andreas Avenue', notes=''),
        Patient(first_name='Mickey', last_name='S', address='Ace Jones Drive', notes=''),
        Patient(first_name='Lang', last_name='Buddha', address='Ace Jones Drive', notes=''),
    ]

    db.session.add_all(patients)
    db.session.commit()


def undo_patients():
    db.session.execute('TRUNCATE patients RESTART IDENTITY CASCADE;')
    db.session.commit()
