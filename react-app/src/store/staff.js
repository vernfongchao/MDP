
const LOAD_STAFFS = "staffs/LOAD_STAFFS"
const LOAD_STAFF = "staffs/LOAD_STAFF"

const loadStaffs = (staffs) => (
    {
        type: LOAD_STAFFS,
        staffs
    }
)

const loadStaff = (staff) => (
    {
        type: LOAD_STAFF,
        staff
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

export const editStaff = (payload) => async dispatch => {
    const response = await fetch(`/api/staffs/${payload.get('id')}`, {
        method: 'PUT',
        body: payload,
    })
    if (response.ok) {
        const staff = await response.json()
        dispatch(loadStaff(staff))
        return staff
    }
    else if (response.status < 500) {
        const data = await response.json()
        return data.errors
    }
}


const initialState = {}

export default function staffReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case LOAD_STAFFS: {
            newState = { ...state }
            action.staffs.forEach(staff => newState[staff.id] = staff)
            return newState
        }
        case LOAD_STAFF: {
            newState = { ...state }
            newState[action.staff.id] = action.staff
            return newState
        }
        default:
            return state
    }
}

