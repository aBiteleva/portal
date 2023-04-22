import {SystemsAction, SystemsActionTypes, SystemsState} from "../types/systemsTypes";


const initialState: SystemsState = {
    systems: [],
    currentSystem: null,
    loading: false,
    error: null
}
export const systemsReducer = (state = initialState, action: SystemsAction): SystemsState => {
    switch (action.type){
        case SystemsActionTypes.SET_CURRENT_SYSTEM:
            return {...state, currentSystem: action.payload}
        default:
            return state
    }
}
