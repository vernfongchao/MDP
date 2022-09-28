from app.models.db import db

staffreports = db.Table(
    'staffreports',
    db.Column('staff_id', db.Integer, db.ForeignKey('staffs.id')),
    db.Column('report_id', db.Integer, db.ForeignKey('reports.id')),
)