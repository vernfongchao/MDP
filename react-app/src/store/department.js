const LOAD_DEPARTMENTS = '/department/LOAD_DEPARTMENTS'

const loadDepartments = departments => (
    {
        type: LOAD_DEPARTMENTS,
        departments
    }
)

export const getDepartments = () => async dispatch => {
    const response = await fetch('/api/departments/')
    if (response.ok) {
        const departments = await response.json()
        dispatch(loadDepartments(departments))
        return departments
    }
    else if (response.status < 500) {
        const data = await response.json()
        return data.errors
    }
}

const initialState = {}

export default function departmentReducer(state = initialState, action){
    let newState;
    switch(action.type){
        case LOAD_DEPARTMENTS:{
            newState = {...state}
            action.departments.forEach(department => newState[department.id] = department)
            return newState
        }
        default:
            return state
    }
}