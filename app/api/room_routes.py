from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Room

room_routes = Blueprint('rooms', __name__)


# @room_routes.route('/')
# def get_all_rooms():
#     return {'message':'okay'},200

@room_routes.route('/staff/<int:id>') 
@login_required
def get_rooms(id):
    rooms = Room.query.filter((Room.staff_id_1 == id) | (Room.staff_id_2 == id))
    # return {'message':"okay"},200
    return jsonify([room.to_dict() for room in rooms]),200

@room_routes.route('/',methods=["POST"])
@login_required
def add_room():
    details = request.get_json()
    room = Room(staff_id_1 = details["staff_id_1"], staff_id_2 = details["staff_id_2"])
    db.session.add(room)
    db.session.commit()
    return room.to_dict(),200