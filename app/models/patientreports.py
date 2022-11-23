from .db import db, environment, SCHEMA, add_prefix_for_prod

patientreports = db.Table(
    'patientreports',
    db.Column('patient_id', db.Integer, db.ForeignKey(add_prefix_for_prod('patients.id'))),
    db.Column('report_id', db.Integer, db.ForeignKey(add_prefix_for_prod('reports.id'))),
)

if environment == "production":
    patientreports.schema = SCHEMA