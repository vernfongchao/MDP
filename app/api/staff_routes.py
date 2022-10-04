
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Staff, Image, Department
from app.forms import StaffProfileForm
from app.s3_config import (
    upload_file_to_s3, allowed_file, get_unique_filename, delete_image_from_s3)
from datetime import datetime

staff_routes = Blueprint('staffs', __name__)


@staff_routes.route('/')
def get_staffs():
    staffs = Staff.query.all()
    if staffs:
        return jsonify([staff.to_dict() for staff in staffs]), 200
    else:
        return {'errors': {'staff': 'Staff not found'}}, 400


@staff_routes.route('/reports/<int:id>')
def get_staff_reports(id):
    staff = Staff.query.get(id)
    if staff:
        return jsonify(staff.staff_reports_to_dict()), 200
    else:
        return {'errors': {'staff': 'Staff not found'}},400


@staff_routes.route('/departments/<int:id>')
def get_staff_departments(id):
    staff = Staff.query.get(id)
    if staff:
        return jsonify(staff.staff_departments_to_dict()), 200
    else:
        return {'errors': {'staff': 'Staff not found'}}


@staff_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_staff_profile(id):
    form = StaffProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        if request.files:
            upload_image(request.files["image"], id)

        profile = Staff.query.get(id)
        form.populate_obj(profile)
        date = datetime.now()
        profile.updated_at = date
        db.session.commit()
        return profile.to_dict(), 200
    else:
        return {"errors": form.errors}, 400

@staff_routes.route('/departments/<int:id>',methods=["PUT"])
@login_required
def edit_staff_deparments(id):
    details = request.get_json()
    staff = Staff.query.get(id)
    if not staff:
        return {"errors": {"report": "Report not found"}}, 400

    if "add_departments" in details:
        for departmentObj in details["add_departments"]:
            
            department = Department.query.get(departmentObj["departmentId"])
            if not staff.departments.__contains__(department):
                staff.departments.append(department)
                db.session.commit()

    if "delete_departments" in details:
        for departmentObj in details["delete_departments"]:
            department = Department.query.get(departmentObj["departmentId"])
            if staff.departments.__contains__(department):
                staff.departments.remove(department)
                db.session.commit()
    return jsonify(staff.staff_departments_to_dict()), 200







def upload_image(image, id):
    if not allowed_file(image.filename):
        return {"errors": {"image": "file type not permitted"}}, 400

    image.filename = get_unique_filename(image.filename)
    upload = upload_file_to_s3(image)

    if "url" not in upload:
              # if the dictionary doesn't have a url key
              # it means that there was an error when we tried to upload
              # so we send back that error message
        return upload, 400

    url = upload["url"]

    if request.form.get("img_id"):

        name = request.form['imgDelete'].split('/')[-1]

        if 'amazonaws' in request.form['imgDelete']:
            delete_image_from_s3(name)

        img_id = request.form.get("img_id")
        image = Image.query.get(img_id)
        image.imageURL = url

        db.session.commit()

    else:
        add_image = Image(imageURL= url, staff_id=id)
        db.session.add(add_image)
        db.session.commit()
