from flask_socketio import SocketIO, emit, join_room, leave_room
import os

# create your SocketIO instance

if os.environ.get("FLASK_ENV") == "production": 
    origins = [
        'http://mdp.herokuapp.com',
        'https://mdp.herokuapp.com',
        'http://mdp.onrender.com/',
        'https://mdp.onrender.com/',
    ]
else :
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins = origins)

# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    emit("chat", data, broadcast=True, to = data["roomId"])
    # 

# handle delete message
@socketio.on("delete")
def handle_delete(data):
    emit("delete", data, broadcast=True, to=data["roomId"])

@socketio.on('join')
def on_join(data):
    user = data['user']
    room = data['room']
    join_room(room)
    # emit('join',{})
    # send(username + ' has entered the room.', to=room)


@socketio.on('leave')
def on_leave(data):
    user = data['user']
    room = data['room']
    leave_room(room)
    # send(username + ' has left the room.', to=room)
