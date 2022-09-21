const LOAD_ROLES = "/roles/LOAD_ROLES"

const loadRoles = roles => (
    {
        type: LOAD_ROLES,
        roles
    }
    )

export const getRoles = () => async dispatch => {
    const response = await fetch("/api/roles/")
    if(response.ok){
        const roles = await response.json()
        dispatch(loadRoles(roles))
        // return roles
    }
    else if(response.status < 500) {
        const data = await response.json()
        return data.errors
    }
}

const initialState = {}

export default function roleReducer(state = initialState,action){
    let newState;
    switch (action.type){
        case LOAD_ROLES: {
            newState = {...state}
            action.roles.forEach(role => newState[role.id] = role)
            return newState
        }
        default:
            return state
    }
}
