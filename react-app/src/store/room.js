const LOAD_ROOMS = '/rooms/LOAD_ROOMS'
const LOAD_ROOM = '/rooms/LOAD_ROOM'


const loadRooms = rooms => (
    {
        type: LOAD_ROOMS,
        rooms
    }
)

export const getRooms = (id) => async dispatch => {
    const response = await fetch(`/api/rooms/staff/${id}`)
    if (response.ok) {
        let rooms = await response.json()
        dispatch(loadRooms(rooms))
        return rooms
    }
    else if (response.status <500) {
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
        default:
            return state
    }
}