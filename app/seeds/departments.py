from app.models import db, Department


def seed_deparments():
    # 1 Administration
    # 2HR
    # 3IT
    # 4 EMERGENCY
    # 5 Radiology
    # 6 Cardiology
    # 7 Surgery
    # 8 General Services
    # 9 ICU 
    # 10 Neurology
    # 11 Gynaecology
    # 12 Occupational Therapy
    # 13 Oncology
    # 14 Orthopaedics
    # 15 Pharmacy
    # 16 Adult Clinic
    # 17 Women Clinic
    # 18 Pediatrics Clinic"
    # 19 Dental Clinic
    # 20 Optometry Clinic
    # 21 Ophthalmology
    # 22 Phlebotomy
    department = [
        Department(name="Administration", building="1", floor="1"),
        Department(name="Human Resources", building="1", floor="2"),
        Department(name="information technology", building="10", floor="1"),
        Department(name="Accident and Emergency", building="3", floor="1"),
        Department(name="Radiology", building="5", floor="2"),
        Department(name="Cardiology", building="5", floor="3"),
        Department(name="Surgery", building="5", floor="4"),
        Department(name="General Services", building="30", floor="1"),
        Department(name="Intensive Care Unit", building="5", floor="5"),
        Department(name="Neurology", building="80", floor="1"),
        Department(name="Gynaecology", building="9", floor="2"),
        Department(name="Occupational Therapy", building="9", floor="4"),
        Department(name="Oncology", building="90", floor="1"),
        Department(name="Orthopaedics", building="80", floor="2"),
        Department(name="Pharmacy", building="5", floor="2"),
        Department(name="Adult Clinic", building="9", floor="1"),
        Department(name="Women Clinic", building="9", floor="2"),
        Department(name="Pediatrics Clinic", building="40", floor="1"),
        Department(name="Dental Clinic", building="30", floor="1"),
        Department(name="Optometry Clinic", building="9", floor="3"),
        Department(name="Ophthalmology", building="5", floor="4"),
        Department(name="Phlebotomy", building="5", floor="1")
    ]

    db.session.add_all(department)
    db.session.commit()


def undo_departments():
    db.session.execute('TRUNCATE departments RESTART IDENTITY CASCADE;')
    db.session.commit()
