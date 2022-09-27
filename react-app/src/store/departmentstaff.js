const LOAD_DEPARTMENT_STAFFS = '/departmentstaffs/LOAD_DEPARTMENT_STAFFS'
const LOAD_STAFF_DEPARTMENTS = '/departmentstaffs/LOAD_STAFF_DEPARTMENTS'

const loadDepartmentStaffs = department => (
    {
        type: LOAD_DEPARTMENT_STAFFS,
        department
    }
)

export const getDepartmentStaffs = (id) => async dispatch =>{
    const response = await fetch(`/api/departmentstaffs/department/${id}`)
    if (response.ok) {
        const department = await response.json()
        dispatch(loadDepartmentStaffs(department))
        return department
    }
}



const initialState = {department:{}, staff:{}}

const departmentStaffsreducer = (state = initialState ,action) => {
    let newState;
    switch(action.type){
        case LOAD_DEPARTMENT_STAFFS: {
            newState = { staff: { ...state.staff }, department: {} };
            action.department.staff.forEach(person => newState.department[person.staffId] = person)
            return newState
        }
        default:
            return state
    }
}

export default departmentStaffsreducer