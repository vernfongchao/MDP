
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db,Staff
from app.forms import StaffProfileForm


staff_routes = Blueprint('staffs', __name__)

@staff_routes.route('/')
@login_required
def getstaffs():
    staffs = Staff.query.all()
    print(staffs)
    return jsonify([staff.to_dict() for staff in staffs]),200

@staff_routes.route('/<int:id>',methods=["PUT"])
@login_required
def edit_staff_profile(id):
    form = StaffProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print("===========================================================================",request.files["image"])
    if form.validate_on_submit():
        profile = Staff.query.get(id)
        form.populate_obj(profile)
        db.session.commit()
        return profile.to_dict(),200
    else:
        return {"errors":form.errors},400