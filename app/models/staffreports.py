
from .db import db, environment, SCHEMA, add_prefix_for_prod

staffreports = db.Table(
    'staffreports',
    db.Column('staff_id', db.Integer, db.ForeignKey(add_prefix_for_prod('staffs.id'))),
    db.Column('report_id', db.Integer, db.ForeignKey(add_prefix_for_prod('reports.id'))),
)

if environment == "production":
    staffreports.schema = SCHEMA