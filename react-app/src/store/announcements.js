const LOAD_ANNOUNCEMENTS = '/announcement/LOAD_ANNOUNCEMENTS'

const loadAnnouncements = announcements => (
    {
        type: LOAD_ANNOUNCEMENTS,
        announcements
    }
)

export const getAnnouncements = () => async dispatch => {

    const response = await fetch('/api/announcements/')
    if(response.ok){
        const announcement = await response.json()
        dispatch(loadAnnouncements(announcement))
        return announcement
    }
    else if (response.status < 500) {
        const data = await response.json()
        return data.errors
    }
}

const initialState = {}

export default function announcementReducer(state = initialState, action){
    let newState;
    switch(action.type){
        case LOAD_ANNOUNCEMENTS: {
            newState = {...state}
            action.announcements.forEach(announcement => newState[announcement.id] = announcement)
            return newState
        }
        default:
            return state
    }
}