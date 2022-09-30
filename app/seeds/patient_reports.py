from app.models import db, Patient,Report

def seed_patientreports():
    first_patient = Patient.query.get(1)
    second_patient = Patient.query.get(2)
    third_patient = Patient.query.get(3)
    fourth_patient = Patient.query.get(4)
    fifth_patient = Patient.query.get(5)
    sixth_patient = Patient.query.get(6)
    seventh_patient = Patient.query.get(7)
    eighth_patient = Patient.query.get(8)
    ninth_patient = Patient.query.get(9)

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

    first_patient.reports.append(first_report)
    second_patient.reports.append(second_report)
    third_patient.reports.append(third_report)
    fourth_patient.reports.append(fourth_report)
    fifth_patient.reports.append(fifth_report)
    sixth_patient.reports.append(sixth_report)
    seventh_patient.reports.append(seventh_report)
    eighth_patient.reports.append(eighth_report)
    ninth_patient.reports.append(ninth_report)
    first_patient.reports.append(tenth_report)
    db.session.commit()


def undo_patientreports():
    db.session.execute('TRUNCATE patientreports RESTART IDENTITY CASCADE;')
    db.session.commit()
