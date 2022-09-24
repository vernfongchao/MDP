
const LOAD_STAFFS = "staffs/LOAD_STAFFS"

const loadStaffs = (staffs) => (
    {
        type: LOAD_STAFFS,
        staffs
    }
)

export const getStaffs = () => async dispatch => {
    const response = await fetch('/api/staffs/')
    if (response.ok) {
        const staffs = await response.json()
        dispatch(loadStaffs(staffs))
        return staffs
    }
    else if (response.status < 500) {
        const data = await response.json()
        return data.errors
    }
}

const initialState = {}

export default function staffReducer(state = initialState, action) {
    let newState;
    switch(action.type){
        case LOAD_STAFFS: {
            newState = {...state}
            action.staffs.forEach(staff => newState[staff.id] = staff)
            return newState
        }
        default:
            return state
    }
}

