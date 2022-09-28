from app.models.db import db

patientreports = db.Table(
    'patientreports',
    db.Column('patient_id', db.Integer, db.ForeignKey('patients.id')),
    db.Column('report_id', db.Integer, db.ForeignKey('reports.id')),
)
