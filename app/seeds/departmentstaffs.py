from app.models import db, Staff, Department

def seed_departmentstaffs():
    Demo= Staff.query.get(1)
    Vern= Staff.query.get(2)
    Chiew= Staff.query.get(3)
    Lucas = Staff.query.get(4)
    Vu = Staff.query.get(5)
    Gerorge = Staff.query.get(6)
    Katerina = Staff.query.get(7)
    Marnie = Staff.query.get(8)

    administration = Department.query.get(1)
    surgery = Department.query.get(7)
    services = Department.query.get(8)
    icu = Department.query.get(9)
    neurology = Department.query.get(10)
    therapy = Department.query.get(12)
    adult = Department.query.get(16)
    women = Department.query.get(17)
    dental = Department.query.get(19)
    optometry = Department.query.get(20)
    phlebotomy = Department.query.get(22)

    Demo.departments.append(adult)
    Demo.departments.append(optometry)

    Vern.departments.append(administration)

    Chiew.departments.append(women)
    Chiew.departments.append(dental)

    Lucas.departments.append(neurology)
    Lucas.departments.append(adult)
    Lucas.departments.append(women)

    Vu.departments.append(surgery)
    Vu.departments.append(phlebotomy)

    Gerorge.departments.append(therapy)

    Katerina.departments.append(therapy)

    Marnie.departments.append(administration)
    Marnie.departments.append(services)
    Marnie.departments.append(icu)
    Marnie.departments.append(adult)
    Marnie.departments.append(therapy)
    Marnie.departments.append(women)

    db.session.commit()


                


def undo_departmentstaffs():
    db.session.execute('TRUNCATE departmentstaffs RESTART IDENTITY CASCADE;')
    db.session.commit()
