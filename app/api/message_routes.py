from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Message, Room
from app.forms import PostMessageForm, EditMessageForm

from datetime import datetime

message_routes = Blueprint('messages', __name__)


@message_routes.route('/room/<int:id>')
@login_required
def get_messages(id):
    messages = Message.query.filter(Message.room_id == id)
    if not messages:
        return {'errors': 'Messages not found'}, 400
    return jsonify([message.to_dict() for message in messages]), 200


@message_routes.route('/room/<int:id>', methods=["POST"])
@login_required
def post_message(id):
    form = PostMessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        content = form.data['content']
        print("=========================formdata", content  )
        message = Message()
        form.populate_obj(message)
        db.session.add(message)
        db.session.commit()
        return(message.to_dict()), 200
    else:
        return {"errors": form.errors}, 400


@message_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_message(id):
    form = EditMessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        
        message = Message.query.get(id)

        content = form.data['content']
        db_content = message.content

        if content == db_content :
            return message.to_dict(), 200

        form.populate_obj(message)
        message.is_edited = True
        date = datetime.now()
        message.updated_at = date
        db.session.commit()
        return message.to_dict(),200
    else:
        return {"errors": form.errors}, 400

@message_routes.route('/<int:id>',methods=['DELETE'])
@login_required
def delete_message(id):
    message = Message.query.get(id)
    if not message:
        return {'errors': {'message': "Message not found"}}, 400

    db.session.delete(message)
    db.session.commit()
    return message.to_dict(),200
