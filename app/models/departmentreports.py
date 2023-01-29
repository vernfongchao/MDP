from app.models.db import db

departmentreports = db.Table(
    'departmentreports',
    db.Column('department_id', db.Integer, db.ForeignKey('departments.id')),
    db.Column('report_id', db.Integer, db.ForeignKey('reports.id'))
)
