const LOAD_PATIENTS = '/patients/LOAD_PATIENTS'
const LOAD_PATIENT= '/patients/LOAD_PATIENT'
const REMOVE_PATIENT = '/patients/REMOVE_PATIENT'

const loadPatients = patients => (
    {
        type: LOAD_PATIENTS,
        patients
    }
)


const loadPatient = patient => (
    {
        type: LOAD_PATIENT,
        patient
    }
)

const removePatient = patientId => (
    {
        type: REMOVE_PATIENT,
        patientId
    }
)


export const getPatients = () => async dispatch => {
    const response = await fetch('/api/patients/')
    if (response.ok) {
        const patients = await response.json()
        dispatch(loadPatients(patients))
        return patients
    }
    else if (response.status < 500) {
        const data = await response.json()
        return data
    }
}

export const addPatient = (payload) => async dispatch => {
    const response = await fetch ('/api/patients/',{
        method: 'POST',
        body: payload
    })
    if (response.ok){
        const patient = await response.json()
        dispatch(loadPatient(patient))
        return patient
    }
    else if (response.status < 500) {
        const data = await response.json()
        return data
    }
}

export const editPatient = (payload) => async dispatch => {
    const response = await fetch(`/api/patients/${payload.get('id')}`, {
        method: 'PUT',
        body: payload
    })
    if (response.ok) {
        const patient = await response.json()
        dispatch(loadPatient(patient))
        return patient
    }
    else if (response.status < 500) {
        const data = await response.json()
        return data
    }
}

export const deletePatient = (patientId) => async dispatch => {
    const response = await fetch(`/api/patients/${patientId}`,{
        method: 'DELETE'
    })
    if (response.ok) {
        const patient = await response.json()
        dispatch(removePatient(patient.id))
        return patient
    }
    else if (response.status < 500) {
        const data = await response.json()
        return data
    }
}



const initialState = {}

export default function patientReducer(state=initialState, action){
    let newState;
    switch(action.type){
        case LOAD_PATIENTS:{
            newState = {...state}
            action.patients.forEach(patient => newState[patient.id] = patient)
            return newState
        }
        case LOAD_PATIENT : {
            newState = { ...state }
            newState[action.patient.id] = action.patient
            return newState
        }
        case REMOVE_PATIENT : {
            newState = { ...state }
            delete newState[action.patientId]
            return newState
        }
        default:
            return state
    }
}