const LOAD_PATIENTS = '/patients/LOAD_PATIENTS'
const LOAD_PATIENT= '/patients/LOAD_PATIENT'

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
        return data.errors
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
        default:
            return state
    }
}