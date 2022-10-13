import json
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Message, Room
from app.forms import PostMessageForm

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
    form = PostMessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if(form.validate_on_submit()):
        message = Message()
        form.populate_obj(message)
        db.session.add(message)
        db.session.commit()
        return(message.to_dict()),200
    else:
        return {"errors": form.errors}, 400
