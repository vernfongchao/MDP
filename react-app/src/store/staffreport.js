const LOAD_STAFF_REPORTS = 'staffreports/LOAD_STAFF_REPORTS'
const LOAD_REPORT_STAFFS = 'staffreports/LOAD_REPORT_STAFFS'

const loadReportStaffs = reportStaffs => (
    {
        type: LOAD_REPORT_STAFFS,
        reportStaffs
    }
)
const loadStaffReports = staffReports => (
    {
        type: LOAD_STAFF_REPORTS,
        staffReports
    }
)



export const getReportStaffs = id => async dispatch => {
    const response = await fetch(`/api/reports/staffs/${id}`)
    if (response.ok) {
        const reportStaffs = await response.json()
        dispatch(loadReportStaffs(reportStaffs))
        return reportStaffs
    }
    else if (response.status < 500) {
        const error = await response.json()
        return error
    }
}


export const patchReportStaffs = (payload) => async dispatch => {
    const response = await fetch(`/api/reports/staffs/${payload.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const reportStaffs = await response.json()
        dispatch(loadReportStaffs(reportStaffs))
        return reportStaffs
    }
    else if (response.status < 500) {
        const error = await response.json()
        return error
    }
}

export const getStaffReports = id => async dispatch => {
    const response = await fetch(`/api/staffs/reports/${id}`)
    if (response.ok) {
        const staffReports = await response.json()
        dispatch(loadStaffReports(staffReports))
        return staffReports
    }
    else if (response.status < 500) {
        const error = await response.json()
        return error
    }
}




const initialState = { staff: {}, report: {} }

const staffReportsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_REPORT_STAFFS: {
            newState = { staff: { ...state.staff }, report: {} }
            action.reportStaffs.forEach(staff => newState.report[staff.staffId] = staff)
            return newState
        }
        case LOAD_STAFF_REPORTS: {
            newState = { staff: {}, report: { ...state.report } }
            action.staffReports.forEach(report => newState.staff[report.reportId] = report)
            return newState
        }
        default:
            return state
    }
}

export default staffReportsReducer