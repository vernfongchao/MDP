from app.models import db, Report


def seed_reports():

    reports = [
        Report(title='Adult Clinic Visist 9/28/22',content=''),
        Report(title='Women Clinic Visist 9/28/22', content=''),
        Report(title='Occupational Therapy Visit 9/28/22', content=''),
        Report(title='ICU CARE 9/28/22', content=''),
        Report(title='Neurology Visit 9/28/22', content=''),
        Report(title='Radiology Visit 9/28/22', content=''),
        Report(title='Emergency Trauma Surgery 9/28/22', content=''),
        Report(title='Dental Clinic Visit 9/28/22', content=''),
        Report(title='Optometry Clinic Visit 9/28/22', content=''),
        Report(title='Phlebotomy Surgery 9/28/22', content=''),

    ]

    db.session.add_all(reports)
    db.session.commit()


def undo_reports():
    db.session.execute('TRUNCATE reports RESTART IDENTITY CASCADE;')
    db.session.commit()
