
const LOAD_PATIENT_REPORTS = 'patientreports/LOAD_PATIENT_REPORTS'
const DELETE_PATIENT_REPORTS = 'patientreports/DELETE_PATIENT_REPORTS'

const LOAD_REPORT_PATIENTS = 'patientreports/LOAD_REPORT_PATIENTS'


const loadPatientReports = patientReports => (
    {
        type: LOAD_PATIENT_REPORTS,
        patientReports
    }
)

export const removePatientReports = () => (
    {
        type: DELETE_PATIENT_REPORTS
    }
)

const loadReportPatients = reportPatients => (
    {
        type: LOAD_REPORT_PATIENTS,
        reportPatients
    }
)


export const getPatientReports = (id) => async dispatch => {
    const response = await fetch(`/api/patients/reports/${id}`)
    if (response.ok) {
        const patientReports = await response.json()
        dispatch(loadPatientReports(patientReports))
        return patientReports
    }
    else if (response.status < 500) {
        const error = await response.json()
        return error
    }
}

export const getReportPatients = id => async dispatch => {
    const response = await fetch(`/api/reports/patients/${id}`)
    if (response.ok) {
        const reportPatients = await response.json()
        dispatch(loadReportPatients(reportPatients))
        return reportPatients
    }
    else if (response.status < 500) {
        const error = await response.json()
        return error
    }
}

export const patchReportPatients = payload => async dispatch => {
    const response = await fetch(`/api/reports/patients/${payload.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const reportPatients = await response.json()
        dispatch(loadReportPatients(reportPatients))
        return reportPatients
    }
    else if (response.status < 500) {
        const error = await response.json()
        return error
    }
}


const initialState = { patient: {}, report: {} }

const patientReportsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_PATIENT_REPORTS: {
            newState = { patient: {}, report: { ...state.report } }
            action.patientReports.forEach(report => newState.patient[report.reportId] = report)
            return newState
        }
        case LOAD_REPORT_PATIENTS: {
            newState = { patient: { ...state.patient }, report: {} }
            action.reportPatients.forEach(patient => newState.report[patient.patientId] = patient)
            return newState
        }
        case DELETE_PATIENT_REPORTS :{
            newState = { patient: {}, report: {...state.report}}
            return newState
        }
        default:
            return state
    }
}

export default patientReportsReducer