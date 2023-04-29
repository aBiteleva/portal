import {SystemsAction, SystemsActionTypes, SystemsState} from '../types/systemsTypes';


const initialState: SystemsState = {
    systems: [],
    currentSystem: null,
    loading: false,
    error: null
};
export const systemsReducer = (state = initialState, action: SystemsAction): SystemsState => {
    switch (action.type) {
        case SystemsActionTypes.SET_CURRENT_SYSTEM:
            return {...state, currentSystem: action.payload};
        case SystemsActionTypes.FETCH_SYSTEM:
            return {...state, loading: true, error: null, systems: []};
        case SystemsActionTypes.FETCH_SYSTEM_SUCCESS:
            return {...state, loading: false, error: null, systems: action.payload};
        case SystemsActionTypes.FETCH_SYSTEM_ERROR:
            return {...state, loading: false, error: action.payload, systems: []};
        default:
            return state;
    }
};
