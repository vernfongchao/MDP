const LOAD_EMERGENCY_CONTACT = '/contact/LOAD_EMERGENCY_CONTACT'
const REMOVE_EMERGENCY_CONTACTS = '/contact/REMOVE_EMERGENCY_CONTACTS'

const loadContact = contact => (
    {
        type:LOAD_EMERGENCY_CONTACT,
        contact
    }
)

export const removeContacts = () => (
   {
        type: LOAD_EMERGENCY_CONTACT,
   } 
)

export const getContact = (id) => async dispatch => {
    const response = await fetch(`/api/patients/contact/${id}`)
    if (response.ok){
        const contact = await response.json()
        dispatch(loadContact(contact))
        return contact
    }
    else if (response.status < 500){
        const data = await response.json()
        return data
    }
}

const initialState = {}

export default function contactReducer(state = initialState, action){
    let newState;
    switch(action.type){
        case LOAD_EMERGENCY_CONTACT: {
            newState = {}
            newState[action.contact.id] = action.contact
            return newState
        }
        case REMOVE_EMERGENCY_CONTACTS: {
            newState = {}
            return newState
        }
        default:
            return state
    }
}