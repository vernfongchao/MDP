from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Role

roles_routes = Blueprint('roles', __name__)

@roles_routes.route('/')
def get_roles():
    roles = Role.query.all()
    if roles:
        return jsonify([role.to_dict() for role in roles]),200
    elif not roles:
        return {"errors": "roles not found"},400 