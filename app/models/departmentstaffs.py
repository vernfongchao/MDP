from .db import db, environment, SCHEMA, add_prefix_for_prod

departmentstaffs = db.Table(
    'departmentstaffs',
    db.Column('department_id', db.Integer, db.ForeignKey(add_prefix_for_prod('departments.id'))),
    db.Column('staff_id', db.Integer, db.ForeignKey(add_prefix_for_prod('staffs.id')))
)

if environment == "production":
    departmentstaffs.schema = SCHEMA