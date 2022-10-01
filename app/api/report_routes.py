from crypt import methods
from distutils.log import log
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Report, Department, Staff
from app.forms import ReportForm

report_routes = Blueprint('report', __name__)


@report_routes.route('/')
def get_reports():
    reports = Report.query.all()
    if reports:
        return jsonify([report.to_dict() for report in reports]), 200
    else:
        return {"errors": "reports not found"}, 400


@report_routes.route('/patients/<int:id>')
def get_report_patients(id):
    report = Report.query.get(id)
    if report:
        return jsonify(report.report_patients_to_dict()), 200
    else:
        return {"errors": "report not found"}, 400


@report_routes.route('/staffs/<int:id>')
def get_report_staffs(id):
    report = Report.query.get(id)

    if report:
        return jsonify(report.report_staffs_to_dict()), 200
    else:
        return {"errors": "report not found"}, 400


@report_routes.route('/departments/<int:id>')
def get_report_departments(id):
    report = Report.query.get(id)
    if report:
        return jsonify(report.report_departments_to_dict()), 200
    else:
        return {"errors": "report not found"}, 400


@report_routes.route('/', methods=["POST"])
@login_required
def post_report():
    form = ReportForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_report = Report()
        form.populate_obj(new_report)
        db.session.add(new_report)
        db.session.commit()
        return new_report.to_dict(), 200
    else:
        return {"errors": form.errors}, 400


@report_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_report(id):
    form = ReportForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        edit_report = Report.query.get(id)
        form.populate_obj(edit_report)
        db.session.commit()
        return edit_report.to_dict(), 200
    else:
        return {"errors": form.errors}, 400


@report_routes.route('/departments/<int:id>', methods=["PUT"])
@login_required
def edit_report_departments(id):
    details = request.get_json()
    report = Report.query.get(id)
    if not report:
        return {"errors": "report not found"}, 400

    if "add_departments" in details:
        for departmentObj in details["add_departments"]:
            department = Department.query.get(departmentObj["departmentId"])
            if not report.departments.__contains__(department):
                report.departments.append(department)
                db.session.commit()

    if "delete_departments" in details:
        for departmentObj in details["delete_departments"]:
            department = Department.query.get(departmentObj["departmentId"])
            if report.departments.__contains__(department):
                report.departments.remove(department)
                db.session.commit()
    return jsonify(report.report_departments_to_dict()), 200


@report_routes.route('/staffs/<int:id>', methods=['PUT'])
@login_required
def edit_report_staffs(id):
    details = request.get_json()
    report = Report.query.get(id)
    if not report:
        return {"errors": "report not found"}, 400

    if "add_staffs" in details:
        for staffObj in details["add_staffs"]:
            staff = Staff.query.get(staffObj["staffId"])
            if not report.staffs.__contains__(staff):
                report.staffs.append(staff)
                db.session.commit()

    if "delete_staffs" in details:
        for staffObj in details["delete_staffs"]:
            staff = Staff.query.get(staffObj["staffId"])
            if report.staffs.__contains__(staff):
                report.staffs.remove(staff)
                db.session.commit()

    return jsonify(report.report_staffs_to_dict()), 200
