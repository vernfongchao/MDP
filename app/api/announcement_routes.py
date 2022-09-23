from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db,Announcement
from app.forms import AnnouncementForm

announcement_routes = Blueprint('announcement',__name__)

@announcement_routes.route('/')
def get_announcements():
    announcements = Announcement.query.all()
    if announcements:
        return jsonify([announcement.to_dict() for announcement in announcements]),200
    else:
        return {"errors":"announcements not found"},400

@announcement_routes.route('/',methods=["POST"])
@login_required
def post_announcement():
    form = AnnouncementForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_announcement = Announcement()
        form.populate_obj(new_announcement)

        db.session.add(new_announcement)
        db.session.commit()
        return new_announcement.to_dict(), 200
    else:
        print(form.errors)
        return {"errors": form.errors},400

@announcement_routes.route("/<int:id>",methods=["PUT"])
@login_required
def edit_announcement(id):
    form = AnnouncementForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        edit_announcement = Announcement.query.get(id)
        form.populate_obj(edit_announcement)
        db.session.commit()
        return edit_announcement.to_dict(), 200
    else:
        print(form.errors)
        return {"errors": form.errors},400