from app.models import db, Report,Department

def seed_department_reports():
    first_report = Report.query.get(1)
    second_report = Report.query.get(2)
    third_report = Report.query.get(3)
    fourth_report = Report.query.get(4)
    fifth_report = Report.query.get(5)
    sixth_report = Report.query.get(6)
    seventh_report = Report.query.get(7)
    eighth_report = Report.query.get(8)
    ninth_report = Report.query.get(9)
    tenth_report = Report.query.get(10)

    administration = Department.query.get(1)
    emergency = Department.query.get(4)
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


    first_report.departments.append(adult)
    second_report.departments.append(women)
    third_report.departments.append(therapy)
    fourth_report.departments.append(icu)
    fifth_report.departments.append(neurology)
    sixth_report.departments.append(therapy)
    seventh_report.departments.append(emergency)
    eighth_report.departments.append(dental)
    ninth_report.departments.append(optometry)
    tenth_report.departments.append(phlebotomy)
    db.session.commit()

def undo_department_reports():
    db.session.execute(
        'TRUNCATE departmentreports RESTART IDENTITY CASCADE;')
    db.session.commit()