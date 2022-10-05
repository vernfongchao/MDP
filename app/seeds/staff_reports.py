from app.models import db,Staff,Report


def seed_staff_reports():
    first_staff = Staff.query.get(1)
    second_staff = Staff.query.get(2)
    third_staff = Staff.query.get(3)
    fourth_staff = Staff.query.get(4)
    fifth_staff = Staff.query.get(5)
    sixth_staff = Staff.query.get(6)
    seventh_staff = Staff.query.get(7)
    eighth_staff = Staff.query.get(8)

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

    third_staff.reports.append(first_report)
    fourth_staff.reports.append(first_report)

    fourth_staff.reports.append(second_report)
    eighth_staff.reports.append(second_report)


    sixth_staff.reports.append(third_report)
    seventh_staff.reports.append(third_report)

    eighth_staff.reports.append(fourth_report)


    fourth_staff.reports.append(fifth_report)

    seventh_staff.reports.append(sixth_report)

    fifth_staff.reports.append(seventh_report)



    third_staff.reports.append(eighth_report)

    first_staff.reports.append(ninth_report)

    third_staff.reports.append(tenth_report)


    db.session.commit()


def undo_staff_reports():
    db.session.execute('TRUNCATE staffreports RESTART IDENTITY CASCADE;')
    db.session.commit()
