from flask import Blueprint, jsonify, request
from app.models import db, Report

report_routes = Blueprint('report',__name__)

@report_routes.route('/')
def get_reports():
    reports = Report.query.all()
    if reports:
        return jsonify([report.to_dict() for report in reports]),200
    else:
        return {"errors":"reports not found"},400