const LOAD_DEPARTMENT_STAFFS = '/departmentstaffs/LOAD_DEPARTMENT_STAFFS'
const LOAD_STAFF_DEPARTMENTS = '/departmentstaffs/LOAD_STAFF_DEPARTMENTS'

const loadDepartmentStaffs = staffs => (
    {
        type: LOAD_DEPARTMENT_STAFFS,
        staffs
    }
)

const loadStaffDepartments = departments => (
    {
        type:LOAD_STAFF_DEPARTMENTS,
        departments
    }
)

export const getDepartmentStaffs = (id) => async dispatch =>{
    const response = await fetch(`/api/departments/staffs/${id}`)
    if (response.ok) {
        const staffs = await response.json()
        dispatch(loadDepartmentStaffs(staffs))
        return staffs
    }
    else if(response.status < 500){

    }
}

export const getStaffDepartment = (id) => async dispatch => {
    const response = await fetch (`/api/staffs/departments/${id}`)
    if (response.ok) {
        const departments = await response.json()
        dispatch(loadStaffDepartments(departments))
        return departments
    }
    else if (response.status < 500) {
        const error = await response.json()
        return error
    }
}

export const patchStaffDepartments = (payload) => async dispatch => {
    const response = await fetch(`/api/staffs/departments/${payload.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const departments = await response.json()
        dispatch(loadStaffDepartments(departments))
        return departments
    }
    else if (response.status < 500) {
        const error = await response.json()
        return error
    }
}



const initialState = {department:{}, staff:{}}

const departmentStaffsreducer = (state = initialState ,action) => {
    let newState;
    switch(action.type){
        case LOAD_DEPARTMENT_STAFFS: {
            newState = { staff: { ...state.staff }, department: {} };
            action.staffs.forEach(person => newState.department[person.staffId] = person)
            return newState
        }
        case LOAD_STAFF_DEPARTMENTS: {
            newState = { staff: {}, department: { ...state.department } };
            action.departments.forEach(department => newState.staff[department.departmentId] = department)
            return newState
        }
        default:
            return state
    }
}

export default departmentStaffsreducer