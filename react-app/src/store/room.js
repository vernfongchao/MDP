const LOAD_ROOMS = '/rooms/LOAD_ROOMS'
const LOAD_ROOM = '/rooms/LOAD_ROOM'


const loadRooms = rooms => (
    {
        type: LOAD_ROOMS,
        rooms
    }
)

const loadRoom = room => (
    {
        type: LOAD_ROOM,
        room
    }
)

export const getRooms = (id) => async dispatch => {
    const response = await fetch(`/api/rooms/staff/${id}`)
    if (response.ok) {
        const rooms = await response.json()
        dispatch(loadRooms(rooms))
        return rooms
    }
    else if (response.status <500) {
        const data = response.json()
        return data
    }
}

export const postRoom = (payload) => async dispatch => {
    const response = await fetch('/api/rooms/',{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const room = await response.json()
        dispatch(loadRoom(room))
        return room
    }
    else if (response.status < 500) {
        const data = response.json()
        return data
    }
}

const initialState = {}

export default function roomReducer (state = initialState, action) {
    let newState;
    switch(action.type){
        case LOAD_ROOMS : {
            newState = {...state}
            action.rooms.forEach(room => newState[room.id] = room)
            return newState
        }
        case LOAD_ROOM : {
            newState = { ...state }
            newState[action.room.id] = action.room
            return newState
        }
        default:
            return state
    }
}