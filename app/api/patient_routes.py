from curses.ascii import EM
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Patient, EmergencyContact, Image
from app.forms import AddPatientForm, EditPatientForm
from app.s3_config import (
    upload_file_to_s3, allowed_file, get_unique_filename, delete_image_from_s3)

patient_routes = Blueprint('patients', __name__)


@patient_routes.route('/')
def get_patients():
    patients = Patient.query.all()
    if patients:
        return jsonify([patient.to_dict() for patient in patients]), 200
    else:
        return {"errors": "patients not found"}, 400


@patient_routes.route('/contact/<int:id>')
def put_patient_details(id):
    contact = EmergencyContact.query.filter_by(patient_id=id).first()
    if contact:
        return contact.to_dict(), 200
    else:
        return {"errors": {"contact":"contact not found"}}, 400


@patient_routes.route('/', methods=["POST"])
@login_required
def add_patient():
    form = AddPatientForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        patient = Patient()
        form.populate_obj(patient)
        db.session.add(patient)
        db.session.commit()
        if request.files:
            upload_image(request.files["image"], patient.id)
        return patient.to_dict(), 200
    else:
        return {"errors": form.errors}, 400


@patient_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_patient_profile(id):
    form = EditPatientForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        if request.files:
            upload_image(request.files["image"], id)
        patient = Patient.query.get(id)
        form.populate_obj(patient)
        db.session.commit()
        return patient.to_dict(), 200
    else:
        return {"errors": form.errors}, 400


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
        add_image = Image(imageURL=url, patient_id=id)
        db.session.add(add_image)
        db.session.commit()
