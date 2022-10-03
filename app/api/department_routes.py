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


@departments_routes.route('/staffs/<int:id>')
def get_department_staffs(id):
    department = Department.query.get(id)
    if department:
        return jsonify(department.department_staffs_to_dict()),200
