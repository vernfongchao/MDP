const LOAD_REPORTS = '/reports/LOAD_REPORTS'
const LOAD_REPORT = '/reports/LOAD_REPORT'
const REMOVE_REPORT = '/reports/REMOVE_REPORT'

const loadReports = reports => (
    {
        type: LOAD_REPORTS,
        reports
    }
)

const loadReport = report => (
    {
        type: LOAD_REPORT,
        report
    }
)

const removeReport = reportId => (
    {
        type:REMOVE_REPORT,
        reportId
    }
)


export const getReports = () => async dispatch => {
    const response = await fetch('/api/reports/')
    if (response.ok) {
        const reports = await response.json()
        dispatch(loadReports(reports))
        return reports
    }
    else if (response.status < 500) {
        const data = await response.json()
        return data
    }
}

export const addReport = (payload) => async dispatch => {
    const response = await fetch('/api/reports/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const report = await response.json()
        dispatch(loadReport(report))
        return report
    }
    else if (response.status < 500) {
        const data = await response.json()
        return data
    }
}

export const patchReport = (payload) => async dispatch => {
    const response = await fetch(`/api/reports/${payload.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const report = await response.json()
        dispatch(loadReport(report))
        return report
    }
    else if (response.status < 500) {
        const data = await response.json()
        return data
    }
}

export const deleteReport = (reportId) => async dispatch => {
    const response = await fetch(`/api/reports/${reportId}`,{
        method: 'DELETE'
    })
    if (response.ok) {
        const report = await response.json()
        dispatch(removeReport(report.id))
        return report
    }
    else if (response.status < 500) {
        const data = await response.json()
        return data
    }
}




const initialState = {}


export default function reportReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case LOAD_REPORTS: {
            newState = { ...state }
            action.reports.forEach(report => newState[report.id] = report)
            return newState
        }
        case LOAD_REPORT : {
            newState = { ...state }
            newState[action.report.id] = action.report
            return newState
        }
        case REMOVE_REPORT: {
            newState = { ...state }
            delete newState[action.reportId]
            return newState
        }
        default:
            return state
    }
}