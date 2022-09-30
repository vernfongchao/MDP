const LOAD_REPORT_DEPARTMENTS = 'report/LOAD_REPORT_DEPARTMENTS'

const loadReportDepartments = reportDepartments => (
    {
        type: LOAD_REPORT_DEPARTMENTS,
        reportDepartments
    }
)

export const getReportDepartments = (id) => async dispatch => {
    const response = await fetch(`/api/reports/departments/${id}`)
    if(response.ok){
        const reportDepartments = await response.json()
        dispatch(loadReportDepartments(reportDepartments))
        return reportDepartments
    }
    else if (response.status < 500) {
        const error = await response.json()
        return error
    }
}

const initialState = { department: {}, report: {} }

const departmentReportsReducer = (state = initialState,action) => {
    let newState;
    switch(action.type){
        case LOAD_REPORT_DEPARTMENTS : {
            newState = { department:{...state.department}, report:{}}
            action.reportDepartments.forEach(department => newState.report[department.departmentId] = department)
            return newState
        }
        default:
            return state
    }
}

export default departmentReportsReducer