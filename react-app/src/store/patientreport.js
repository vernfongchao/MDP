import { loadContact } from "./contact"
import { removeContacts } from "./contact"


const LOAD_PATIENT_REPORTS = 'patientreports/LOAD_PATIENT_REPORTS'
// const LOAD_REPORT_PATIENTS

const loadPatientReports = patientReports => (
    {
        type:LOAD_PATIENT_REPORTS,
        patientReports
    }
)

export const getPatientDetails = (id) => async dispatch => {
    const response = await fetch(`/api/patients/details/${id}`)
    if(response.ok){
        const details = await response.json()
        dispatch(loadPatientReports(details.patientReports))
        return details
    }
    else if (response.status <500){
        const error = await response.json()
        return error
    }
}

const initialState = { patient: {}, report:{} }

const patientReportsReducer = (state= initialState,action) => {
    let newState;
    switch(action.type){
        case LOAD_PATIENT_REPORTS: {
            newState = { patient: {}, report: {} }
            action.patientReports.forEach(report => newState.patient[report.reportId]=report)
            return newState
        }
        default:
            return state
    }
}

export default patientReportsReducer