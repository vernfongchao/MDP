import json
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Message, Room

message_routes = Blueprint('messages', __name__)

@message_routes.route('/room/<int:id>')
@login_required
def get_messages(id):
    messages = Message.query.filter(Message.room_id == id)
    if not messages:
        return {'errors': 'Messages not found'},400
    return jsonify([message.to_dict() for message in messages]), 200


@message_routes.route('/room/<int:id>',methods=["POST"])
@login_required
def post_message(id):
    room = Room.query.get(id)
    if not room:
        return {'errors': "Room not found"}
    details = request.get_json()
    staff_id = details["staff_id"]
    room_id = details["room_id"]
    content = details["content"]

    message = Message(staff_id=staff_id,room_id=room_id,content=content)
    db.session.add(message)
    db.session.commit()

    return(message.to_dict()),200
