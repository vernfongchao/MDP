from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Room

room_routes = Blueprint('rooms', __name__)


@room_routes.route('/')
def get_all_rooms():
    return {'message':'okay'},200

@room_routes.route('/staff/<int:id>') 
def get_rooms(id):
    rooms = Room.query.filter((Room.staff_id_1 == id) | (Room.staff_id_2 == id))
    # return {'message':"okay"},200
    return jsonify([room.to_dict() for room in rooms]),200