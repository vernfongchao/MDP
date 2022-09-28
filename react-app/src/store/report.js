const LOAD_REPORTS = '/reports/LOAD_REPORTS'


const loadReports = reports => (
    {
        type: LOAD_REPORTS,
        reports
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
        return data.errors
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
        default:
            return state
    }
}