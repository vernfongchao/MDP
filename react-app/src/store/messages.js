const LOAD_MESSAGES = 'messages/LOAD_MESSAGES'
const LOAD_MESSAGE = 'messages/LOAD_MESSAGE'
const REMOVE_MESSAGES = 'messages/REMOVE_MESSAGES'

const loadMessages = messages => (
    {
        type: LOAD_MESSAGES,
        messages
    }
)

export const loadMessage = message => (
    {
        type: LOAD_MESSAGE,
        message
    }
)

export const removeMessages = () => (
    {
        type: REMOVE_MESSAGES
    }
)

export const getMessages = (id) => async dispatch => {
    const response = await fetch(`/api/messages/room/${id}`)
    if (response.ok) {
        const messages = await response.json()
        dispatch(loadMessages(messages))
        return messages
    }
    else if (response.status < 500) {
        const data = response.json()
        return data
    }
}

export const postMessage = (payload) => async dispatch => {

    const response = await fetch(`/api/messages/room/${payload.room_id}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const message = await response.json()
        dispatch(loadMessage(message))
        return message
    }
    else if (response.status < 500) {
        const data = response.json()
        return data
    }
}

export const editMessage = (payload) => async dispatch => {
    const response = await fetch(`/api/messages/${payload.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const message = await response.json()
        dispatch(loadMessage(message))
        return message
    }
    else if (response.status < 500) {
        const data = response.json()
        return data
    }
}

const initialState = {}

export default function messageReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case LOAD_MESSAGES: {
            newState = {}
            action.messages.forEach(message => newState[message.id] = message)
            return newState
        }
        case LOAD_MESSAGE: {
            newState = { ...state }
            newState[action.message.id] = action.message
            return newState
        }
        case REMOVE_MESSAGES : {
            return {}
        }
        default:
            return state
    }
}