const LOAD_CONDITIONS = '/department/LOAD_CONDITIONS'

const loadConditions = conditions => (
    {
        type: LOAD_CONDITIONS,
        conditions
    }
)

export const getConditions = () => async dispatch => {
    const response = await fetch('/api/conditions/')
    if (response.ok) {
        const conditions = await response.json()
        dispatch(loadConditions(conditions))
        return conditions
    }
    else if (response.status < 500) {
        const data = await response.json()
        return data.errors
    }
}


const initialState = {}

export default function conditionReducer(state = initialState, action){
    let newState;
    switch(action.type){
        case LOAD_CONDITIONS:{
            newState = {...state}
            action.conditions.forEach(condition => newState[condition.id] = condition)
            return newState
        }
        default:
            return state
    }
}