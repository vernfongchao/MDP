const LOAD_PATIENTS = '/patient/LOAD_PATIENTS'

const loadPatients = patients => (
    {
        type: LOAD_PATIENTS,
        patients
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
        default:
            return state
    }
}