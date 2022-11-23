from .db import db, environment, SCHEMA, add_prefix_for_prod

departmentreports = db.Table(
    'departmentreports',
    db.Column('department_id', db.Integer, db.ForeignKey(add_prefix_for_prod('departments.id'))),
    db.Column('report_id', db.Integer, db.ForeignKey(add_prefix_for_prod('reports.id')))
)
if environment == "production":
    departmentreports.schema = SCHEMA