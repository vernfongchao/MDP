from app.models import db, Staff, Department

def seed_departmentstaffs():
    Demo= Staff.query.get(1)
    Vern= Staff.query.get(2)
    Chiew= Staff.query.get(3)
    Lucas = Staff.query.get(4)
    Vu = Staff.query.get(5)
    Gerorge = Staff.query.get(6)
    Katerina = Staff.query.get(7)

    administration = Department.query.get(1)
    surgery = Department.query.get(7)
    therapy = Department.query.get(12)
    adult = Department.query.get(16)
    women = Department.query.get(17)

    Demo.departments.append(adult)
    Vern.departments.append(administration)
    Chiew.departments.append(women)
    Lucas.departments.append(adult)
    Lucas.departments.append(women)
    Vu.departments.append(surgery)
    Gerorge.departments.append(therapy)
    Katerina.departments.append(therapy)

    db.session.commit()


                


def undo_departmentstaffs():
    db.session.execute('TRUNCATE departmentstaffs RESTART IDENTITY CASCADE;')
    db.session.commit()
