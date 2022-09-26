from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Department, db

departments_routes = Blueprint('departments', __name__)

@departments_routes.route('/')
@login_required
def get_departments():
    departments = Department.query.all()
    if departments:
        return jsonify([department.to_dict() for department in departments]),200
    else:
        return {"errors": "departments not found"}, 400





# @departments_routes.route('/<int:id>')
# def department_staffs(id):
#     department = Department.query.get(id)
#     if department:
#         return {'staff':department.to_departmentstaffs_dict(),
#         'department': []}