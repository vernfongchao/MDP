from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Department,Staff,db


departmentstaffs_routes = Blueprint('departmentstaffs', __name__)

@departmentstaffs_routes.route('/department/<int:id>')
def department_staffs(id):
    department = Department.query.get(id)
    if department:
        return {'staff':department.to_departmentstaffs_dict(),
        'department': []}
