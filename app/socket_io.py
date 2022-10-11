from flask_socketio import SocketIO, emit, join_room, leave_room
import os

# create your SocketIO instance

if os.environ.get("FLASK_ENV") == "production": 
    origins = [
        'http://mdp-application.herokuapp.com',
        'https://mdp-application.herokuapp.com'
    ]
else :
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins = origins)

# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    print(data)
    emit("chat", data, broadcast=True, )
    # 


@socketio.on('join')
def on_join(data):
    user = data['user']
    room = data['room']
    join_room(room)
    # emit('join',{})
    # send(username + ' has entered the room.', to=room)


@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', to=room)
