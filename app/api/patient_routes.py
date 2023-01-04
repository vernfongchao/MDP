from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Patient, EmergencyContact, Image
from app.forms import AddPatientForm, EditPatientForm
from app.s3_config import (
    upload_file_to_s3, allowed_file, get_unique_filename, delete_image_from_s3)

from datetime import datetime

patient_routes = Blueprint('patients', __name__)


@patient_routes.route('/')
def get_patients():
    patients = Patient.query.all()
    if patients:
        return jsonify([patient.to_dict() for patient in patients]), 200
    else:
        return {"errors": "patients not found"}, 400


@patient_routes.route('/contact/<int:id>')
def get_patient_contact(id):
    contact = EmergencyContact.query.filter_by(patient_id=id).first()
    patient = Patient.query.get(id)
    if patient:
        if contact:
            return contact.to_dict(), 200
        else:
            return {"errors": {"contact": "contact not found"}}, 400
    else:
        return {"errors": {"patient": "patient not found"}}, 400

@patient_routes.route('/reports/<int:id>')
def get_patient_report(id):
    patient = patient = Patient.query.get(id)
    if(patient):
        return jsonify(patient.patient_reports_to_dict()),200
    else:
        return {"errors": {"patient": "patient not found"}}, 400



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
        print('=========================================================================================================',request.files)
        if request.files:
            upload_image(request.files["image"], id)
        patient = Patient.query.get(id)
        form.populate_obj(patient)
        date = datetime.now()
        patient.updated_at = date
        db.session.commit()
        return patient.to_dict(), 200
    else:
        return {"errors": form.errors}, 400


@patient_routes.route('/contact/<int:id>', methods=["PUT"])
@login_required
def put_patient_contact(id):
    contact_info = request.get_json()
    contact = EmergencyContact.query.filter_by(patient_id=id).first()
    patient = Patient.query.get(id)

    if patient:
        if contact:
            contact.first_name = contact_info["first_name"]
            contact.last_name = contact_info["last_name"]
            contact.phone = contact_info["phone"]
            db.session.commit()
            return contact.to_dict(), 200
        else:
            contact = EmergencyContact(
                first_name=contact_info["first_name"],
                last_name=contact_info["last_name"],
                phone=contact_info["phone"],
                patient_id=contact_info["id"],
            )
            db.session.add(contact)
            db.session.commit()
            return contact.to_dict(), 200
    else:
        return {"errors": {"patient": "patient not found"}}, 400

@patient_routes.route('/<int:id>',methods=["DELETE"])
@login_required
def delete_patient(id):
    patient = Patient.query.get(id)
    if not patient:
        return {"errors": "Patient not found"},400
    if patient.to_dict()['imgId']:
        delete_image = Image.query.get(patient.to_dict()['imgId'])
        name = delete_image.imageURL

        if 'amazonaws' in name:
            delete_image_from_s3(name)

        db.session.delete(delete_image)
        db.session.commit()

    db.session.delete(patient)
    db.session.commit()
    return patient.to_dict(),200
    

def upload_image(image, id):
    print("======================================================== Image name",image.filename)
    if not allowed_file(image.filename):
        return {"errors": {"image": "file type not permitted"}}, 400

    image.filename = get_unique_filename(image.filename)
    upload = upload_file_to_s3(image)
    print("================================================================ upload",upload)
    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    print("====================================================================== image url",url)
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
