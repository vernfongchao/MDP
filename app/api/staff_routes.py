from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Staff


staff_routes = Blueprint('staffs', __name__)

@staff_routes.route('/')
@login_required
def getstaffs():
    staffs = Staff.query.all()
    print(staffs)
    return jsonify([staff.to_dict() for staff in staffs]),200
