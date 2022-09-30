from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Report
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
    ("================================================= REACHED HERE",report)
    if report:
        return jsonify(report.report_departments_to_dict()),200
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
