const LOAD_ANNOUNCEMENTS = '/announcement/LOAD_ANNOUNCEMENTS'
const ADD_ANNOUNCEMENT = '/announcement/ADD_ANNOUNCEMENT'
const REMOVE_ANNOUNCEMENT = '/announcement/REMOVE_ANNOUNCEMENT'

const loadAnnouncements = announcements => (
    {
        type: LOAD_ANNOUNCEMENTS,
        announcements
    }
)

const loadAnnouncement = announcement => ({
    type: ADD_ANNOUNCEMENT,
    announcement
})

const removeAnnouncement = announcement => (
    {
        type: REMOVE_ANNOUNCEMENT,
        announcement
    }
)


export const getAnnouncements = () => async dispatch => {

    const response = await fetch('/api/announcements/')
    if (response.ok) {
        const announcement = await response.json()
        dispatch(loadAnnouncements(announcement))
        return announcement
    }
    else if (response.status < 500) {
        const data = await response.json()
        return data.errors
    }
}

export const addAnnouncement = (payload) => async dispatch => {
    const response = await fetch('/api/announcements/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const announcement = await response.json()
        dispatch(loadAnnouncement(announcement))
        return announcement
    }
    else if (response.status < 500) {
        const data = await response.json()
        return data
    }
}

export const editAnnouncement = (payload) => async dispatch => {
    const response = await fetch(`/api/announcements/${payload.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const announcement = await response.json()
        dispatch(loadAnnouncement(announcement))
        return announcement
    }
    else if (response.status < 500) {
        const data = await response.json()
        return data
    }
}

export const deleteAnnouncement = (id) => async dispatch => {
    const response = await fetch(`/api/announcements/${id}`,{
        method: 'DELETE'
    })
    if(response.ok){
        const announcement = await response.json()
        dispatch(removeAnnouncement(announcement))
        return announcement
    }
    else if (response.status < 500){
        const data = await response.json()
        return data
    }
}


const initialState = {}

export default function announcementReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case LOAD_ANNOUNCEMENTS: {
            newState = { ...state }
            action.announcements.forEach(announcement => newState[announcement.id] = announcement)
            return newState
        }
        case ADD_ANNOUNCEMENT: {
            newState = { ...state }
            newState[action.announcement.id] = action.announcement
            return newState
        }
        case REMOVE_ANNOUNCEMENT: {
            newState = {...state}
            delete newState[action.announcement.id]
            return newState
        }
        default:
            return state
    }
}