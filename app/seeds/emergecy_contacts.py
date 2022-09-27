from app.models import db, EmergencyContact

def seed_emergency_contacts():
    contacts = [
        EmergencyContact(first_name='Mary', last_name='Mushkin',
                         phone='4159668146', patient_id=1),
        EmergencyContact(first_name='Eddie', last_name='Marshall',
                         phone='4159668146', patient_id=2),
        EmergencyContact(first_name='Randy', last_name='Bullet',
                         phone='4159668146', patient_id=3),
        EmergencyContact(first_name='Ramee', last_name='El-Rahman',
                         phone='4159668146', patient_id=4),
        EmergencyContact(first_name='Nicholas', last_name='Simone',
                         phone='4159668146', patient_id=5),
        EmergencyContact(first_name='Michael', last_name='Simone',
                         phone='4159668146', patient_id=6),
        EmergencyContact(first_name='Peach', last_name='Chee',
                         phone='4159668146', patient_id=7),
        EmergencyContact(first_name='Peach', last_name='Chee',
                         phone='4159668146', patient_id=8),
        EmergencyContact(first_name='Tony', last_name='Corleone',
                         phone='4159668146', patient_id=9),
    ]
    
    db.session.add_all(contacts)
    db.session.commit()

def undo_emergency_contacts():
    db.session.execute('TRUNCATE emergencycontacts RESTART IDENTITY CASCADE;')
    db.session.commit()