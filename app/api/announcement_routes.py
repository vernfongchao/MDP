from flask import Blueprint, jsonify
from app.models import Announcement, announcements

announcement_routes = Blueprint('announcement',__name__)

@announcement_routes.route('/')
def get_announcements():
    announcements = Announcement.query.all()
    if announcements:
        return jsonify([announcement.to_dict() for announcement in announcements]),200
    else:
        return {"errors":"announcements not found"},400