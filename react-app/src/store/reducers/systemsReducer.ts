import {SystemsAction, SystemsActionTypes, SystemsState} from '../types/systemsTypes';

const initialState: SystemsState = {
    systems: [],
    currentSystem: {
        name: '',
        code: '',
        children: []
    },
    currentSystems: [],
    isLoading: false,
    error: null,
    systemPagesWay: []
};

export const systemsReducer = (state = initialState, action: SystemsAction): SystemsState => {
    switch (action.type) {
        case SystemsActionTypes.SET_CURRENT_SYSTEM:
            return {...state, currentSystem: action.payload};
        case SystemsActionTypes.SET_CURRENT_SYSTEMS:
            return {...state, currentSystems: action.payload};
        case SystemsActionTypes.SET_SYSTEM_PAGES_WAY:
            return {...state, systemPagesWay: action.payload};
        case SystemsActionTypes.FETCH_SYSTEM:
            return {...state, isLoading: true, error: null, systems: []};
        case SystemsActionTypes.FETCH_SYSTEM_SUCCESS:
            return {...state, isLoading: false, error: null, systems: action.payload};
        case SystemsActionTypes.FETCH_SYSTEM_ERROR:
            return {...state, isLoading: false, error: action.payload, systems: []};
        default:
            return state;
    }
};
