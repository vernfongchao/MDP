from app.models import db, Patient


def seed_patients():
    patients = [
        Patient(first_name='Eddie', last_name='Marshall', address='Mirror Park Blvd', notes='',
                emergency_contact_name='Mary Mushkin', emergency_contact_phone='4159668146'),
        Patient(first_name='Mary', last_name='Mushkin', address='North Rockford Drive', notes='',
                emergency_contact_name='Eddie Marshal', emergency_contact_phone='4159668146'),
        Patient(first_name='Ramee', last_name='El-Rahman', address='Vespucci Blvd', notes='',
                emergency_contact_name='Randy Bullet', emergency_contact_phone='4159668146'),
        Patient(first_name='Randy', last_name='Bullet', address='Vespucci Blvd', notes='',
                emergency_contact_name='Ramee El-Rahman', emergency_contact_phone='4159668146'),
        Patient(first_name='Michael', last_name='Simone', address='Magellan', notes='',
                emergency_contact_name='Nicholas Simone', emergency_contact_phone='4159668146'),
        Patient(first_name='Nicholas', last_name='Simone', address='Magellan', notes='',
                emergency_contact_name='Michael Simone', emergency_contact_phone='4159668146'),
        Patient(first_name='Jim', last_name='Underwood', address='San Andreas Avenue', notes='',
                emergency_contact_name='Peach Chee', emergency_contact_phone='4159668146'),
        Patient(first_name='Mickey', last_name='S', address='Ace Jones Drive', notes='',
                emergency_contact_name='Peach Chee', emergency_contact_phone='4159668146'),
        Patient(first_name='Lang', last_name='Buddha', address='Ace Jones Drive', notes='',
                emergency_contact_name='Tony Corleone', emergency_contact_phone='4159668146'),
    ]

    db.session.add_all(patients)
    db.session.commit()


def undo_patients():
    db.session.execute('TRUNCATE patients RESTART IDENTITY CASCADE;')
    db.session.commit()
