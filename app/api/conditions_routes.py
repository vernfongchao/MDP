from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db,Condition

condition_routes = Blueprint('condition', __name__)

@condition_routes.route('/')
def get_conditions():
    conditions = Condition.query.all()
    if not conditions:
        return {"errors": "conditions not found"}, 400
    return jsonify([condition.to_dict() for condition in conditions]),200