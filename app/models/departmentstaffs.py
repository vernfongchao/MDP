from app.models.db import db

departmentstaffs = db.Table(
    'departmentstaffs',
    db.Column('department_id', db.Integer, db.ForeignKey('departments.id')),
    db.Column('staff_id', db.Integer, db.ForeignKey('staffs.id'))
)
